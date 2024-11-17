import { mongooseConnect } from "../../lib/mongoose";
import { User } from "../../models/User";
import bcrypt from "bcryptjs";

export default async function handle(req, res) {
  await mongooseConnect();
  const { method } = req;

  try {
    if (method === "GET") {
      const users = await User.find();
      return res.status(200).json(users);
    }

    if (method === "POST") {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ message: "Preencha todos os campos" });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Administrador já cadastrado" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });
      await newUser.save();

      return res
        .status(201)
        .json({ message: "Administrador cadastrado com sucesso!" });
    }

    if (method === "DELETE") {
      const { id } = req.query;
      const deletedUser = await User.findByIdAndDelete(id);

      if (!deletedUser) {
        return res
          .status(404)
          .json({ message: "Administrador não encontrado" });
      }

      return res
        .status(200)
        .json({ message: "Administrador deletado com sucesso!" });
    }

    return res.status(405).json({ message: `Método ${method} não permitido`});
  } catch (error) {
    console.error("Erro no servidor:", error);
    return res
      .status(500)
      .json({ message: "Erro no servidor", error: error.message });
  }
}