import mongoose from "mongoose";
import { mongooseConnect } from "../../lib/mongoose";
import { Animal } from "../../models/Animal";

export default async function handle(req, res) {
  await mongooseConnect();

  const { method } = req;
  const { id, categoria, porte, raca, idade, nome } = req.query;

  try {
    if (method === "GET") {
      try {
        if (id) {
          if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID inválido" });
          }

          const animal = await Animal.findById(id);
          if (!animal) {
            return res.status(404).json({ error: "Animal não encontrado." });
          }
          return res.status(200).json(animal);
        }

        if (categoria) {
          const query = buildQuery({ categoria, porte, raca, idade, nome });
          const animais = await Animal.find(query).lean();
          return res.status(200).json(animais);
        }

        const query = buildQuery({ porte, raca, idade, nome });
        const animais = await Animal.find(query).lean();
        return res.status(200).json(animais);
      } catch (error) {
        console.error("Erro ao buscar animais:", error);
        return res.status(500).json({ error: "Erro ao buscar animais." });
      }
    }

    if (method === "POST") {
      const animais = Array.isArray(req.body) ? req.body : [req.body];

      const animaisCriados = await Animal.insertMany(
        animais.map(
          ({
            nome,
            imagem,
            idade,
            porte,
            raca,
            historico,
            status,
            categoria,
          }) => ({
            nome,
            imagem,
            idade,
            porte,
            raca,
            historico,
            status,
            categoria,
          })
        )
      );

      return res.status(201).json(animaisCriados);
    }

    if (method === "PUT") {
      if (!id) {
        return res.status(400).json({ error: "ID do animal é necessário." });
      }
      const animalAtualizado = await Animal.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!animalAtualizado) {
        return res.status(404).json({ error: "Animal não encontrado." });
      }
      return res.status(200).json(animalAtualizado);
    }

    if (method === "DELETE") {
      if (!id) {
        return res.status(400).json({ error: "ID do animal é necessário." });
      }
      const animalDeletado = await Animal.findByIdAndDelete(id);
      if (!animalDeletado) {
        return res.status(404).json({ error: "Animal não encontrado." });
      }
      return res.status(200).json({ message: "Animal deletado com sucesso." });
    }

    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    return res.status(405).end(`Método ${method} não permitido.`);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro no servidor.", message: error.message });
  }
}

function buildQuery({ categoria, porte, raca, idade, nome }) {
  const query = {};

  if (categoria) query.categoria = categoria;
  if (porte) query.porte = porte;
  if (raca) query.raca = raca;
  if (idade) query.idade = idade;
  if (nome) query.nome = new RegExp(nome, "i");

  return query;
}
