import mongoose, { Schema, model, models } from "mongoose";

const ColaboreSchema = new Schema(
  {
    nome: { type: String, required: true },
    email: { type: String, required: true },
    telefone: { type: String, required: true },
    motivo: { type: String, required: true },
    outro: { type: String }, 
    comentarios: { type: String },
  },
  { timestamps: true } 
);

export const Colabore = models.Colabore|| model("Colabore", ColaboreSchema);
