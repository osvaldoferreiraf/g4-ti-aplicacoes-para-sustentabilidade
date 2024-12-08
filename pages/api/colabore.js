import { mongooseConnect } from "../../lib/mongoose";
import mongoose from "mongoose";

export default async function handle(req, res) {
  const { method } = req;

  await mongooseConnect();

  try {
    if (method === "POST") {
      const { nome, email, telefone, motivo, outro, comentarios } = req.body;

      if (!nome || !email || !telefone || !motivo) {
        return res
          .status(400)
          .json({ message: "Todos os campos obrigatórios devem ser preenchidos." });
      }

      const colaboreCollection = mongoose.connection.collection("colabores");

      const result = await colaboreCollection.insertOne({
        nome,
        email,
        telefone,
        motivo,
        outro: motivo === "outro" ? outro : null,
        comentarios,
        createdAt: new Date(),
      });

      if (result.acknowledged) {
        return res.status(201).json({ message: "Dados salvos com sucesso!" });
      } else {
        return res.status(500).json({ message: "Erro ao salvar os dados." });
      }
    }

    if (method === "GET") {
      const colaboreCollection = mongoose.connection.collection("colabores");
      const colaboracoes = await colaboreCollection.find({}).toArray();
      return res.status(200).json(colaboracoes);
    }

    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Método ${method} não permitido.`);
  } catch (error) {
    console.error("Erro na API /api/colabore:", error);
    res.status(500).json({ message: "Erro no servidor" });
  }
}
