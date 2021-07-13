import { RecipeModel } from "../models/recipe";

import mongoose from "mongoose";
import request from "supertest";
import { IngredientModel } from "../models/ingredient";
import pluralize from "pluralize";
import { app, httpServer } from "..";

beforeEach((done) => {
  mongoose.connect(
    "localhost:27017/test",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done()
  );
});

afterEach(async () => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close();
  });
  await httpServer.close();
});

test("Post /api/recipe/:recipeId", async () => {
  const ingredient = await IngredientModel.create({
    name: "Lard",
    amount: 4,
    unit: "cups",
  });

  const recipe = await RecipeModel.create({
    name: "Recipe 1",
    instructions: "Lorem ipsum",
    ingredients: [ingredient],
  });

  const response = await request(app).get(`/api/recipe/${recipe.id}`);

  // Check type and length
  expect(response.body.ingredients[0]).toBe(
    `${pluralize(ingredient.unit, ingredient.amount, true)} of ${
      ingredient.name
    }`
  );

  // Check data
  expect(response.body.name).toBe(recipe.name);
});
