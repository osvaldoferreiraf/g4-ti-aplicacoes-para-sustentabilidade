import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { mongooseConnect } from "../../lib/mongoose";
import { User } from "../../models/User";

const JWT_SECRET = "arca-de-noe-secret";

export default async function handle(req, res) {
  await mongooseConnect();

  const { method } = req;
  const { email, password } = req.body;

  if (method === "POST") {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email ou senha inválidos" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Email ou senha inválidos" });
    }

    const payload = { id: user._id, email: user.email };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    return res.status(200).json({
      message: "Login bem-sucedido",
      token,
      email: user.email,
      isLoggedAdmin: true,
    });
  }

  return res.status(405).json({ message: "Método não permitido" });
}