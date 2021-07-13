import app from "../../server/app";
import http from "http";
import { createAndConnectToServer } from "../../server/db";

const httpServer = new http.Server(app);

export default async function globalSetup() {
  await createAndConnectToServer();

  httpServer.listen(4000, "0.0.0.0", () => {
    console.log("now running on 4000");
  });

  console.log("globalSetup.ts was invoked");
}

export { app, httpServer };
