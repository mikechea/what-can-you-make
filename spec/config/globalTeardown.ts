import { httpServer } from "./globalSetup";

module.exports = async function globalTeardown() {
  httpServer.close();
  // Your global teardown
  console.log("globalTeardown.ts was invoked");
};
