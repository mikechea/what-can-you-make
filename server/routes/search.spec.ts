import { RecipeModel } from "../models/recipe";

import { app, httpServer } from "..";
import mongoose from "mongoose";
import request from "supertest";

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
});

afterAll(async () => {
  await httpServer.close();
});

test("Post /api/search", async () => {
  const recipe = await RecipeModel.create({
    name: "Recipe 1",
    instructions: "Lorem ipsum",
  });

  const response = await request(app)
    .post("/api/search")
    .send({ name: "Recipe 1" })
    .set("Accept", "application/json");

  // Check type and length
  expect(Array.isArray(response.body)).toBeTruthy();
  expect(response.body.length).toEqual(1);

  // Check data
  expect(response.body[0].name).toBe(recipe.name);
  expect(response.body[0].id).toBe(recipe.id);
});

test("Post /api/search with no name", async () => {
  const recipe1 = await RecipeModel.create({
    name: "recipe 1",
    instructions: "Lorem ipsum",
  });

  const recipe2 = await RecipeModel.create({
    name: "recipe 2",
    instructions: "Lorem ipsum 2",
  });

  const response = await request(app)
    .post("/api/search")
    .set("Accept", "application/json");

  // Check type and length
  expect(Array.isArray(response.body)).toBeTruthy();
  expect(response.body.length).toEqual(2);
});
