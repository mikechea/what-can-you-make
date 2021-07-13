import { Model, model, Schema, Document } from "mongoose";
export interface Ingredient extends Document {
  name: string;
  unit: string;
  amount: number;
}

export const IngredientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

export const IngredientModel = model<Ingredient, Model<Ingredient>>(
  "Ingredient",
  IngredientSchema
);
