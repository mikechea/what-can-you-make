import express from "express";
import bodyParser from "body-parser";
import http from "http";
import { createAndConnectToServer } from "./db";
import { searchMiddleware, recipeMiddleware } from "./routes";
import app from "./app";

const httpServer = new http.Server(app);

const appStartup = async (): Promise<void> => {
  await createAndConnectToServer();
  // add parsers for the body
  // app.use(bodyParser.json());
  // app.use(bodyParser.urlencoded({ extended: false }));
  // // create our routes
  // app.post("/api/search", searchMiddleware);
  // create a server
  httpServer.listen(4000, "0.0.0.0", () => {
    console.log("now running on 4000");
  });
};

appStartup();

export { app, httpServer };
