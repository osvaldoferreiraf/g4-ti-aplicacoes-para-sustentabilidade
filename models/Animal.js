import mongoose, { Schema, model, models } from "mongoose";

const AnimalSchema = new Schema(
  {
    nome: { type: String, required: true },
    imagem: { type: String, required: false },
    idade: { type: Number, required: true },
    porte: { type: String, required: true },
    raca: { type: String, required: true },
    historico: { type: String },
    status: { type: String, enum: ["Disponível", "Adotado"], required: true },
    categoria: { type: String, enum: ["cao", "gato"], required: true },
  },
  { timestamps: true }
);

export const Animal = models.Animal || model("Animal", AnimalSchema);
