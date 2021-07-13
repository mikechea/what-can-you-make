import bodyParser from "body-parser";
import express from "express";
import { recipeMiddleware, searchMiddleware } from "./routes";

const app = express();

// add parsers for the body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// create our routes
app.post("/api/search", searchMiddleware);
app.get("/api/recipe/:recipeId", recipeMiddleware);

export default app;
