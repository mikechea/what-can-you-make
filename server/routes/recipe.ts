import { Request, Response, NextFunction } from "express";
import { Ingredient, RecipeModel } from "../models";
import pluralize from "pluralize";
interface Query {
  id?: string;
}

const recipeCleaner = (
  recipe
): { name: string; instructions: string; ingredients: [string] } => {
  const { name, instructions, ingredients } = recipe;
  return {
    name,
    instructions,
    ingredients: ingredients.map(
      (ingredient) =>
        `${pluralize(ingredient.unit, ingredient.amount, true)} of ${
          ingredient.name
        }`
    ),
  };
};

export const recipeMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { recipeId } = req.params;

  const foundRecipe = await RecipeModel.findById(recipeId);

  res.send(recipeCleaner(foundRecipe));
};
