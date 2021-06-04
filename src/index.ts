import { run } from "probot";
import app = require("./app");

run(app).catch((error) => {
  console.error(error);
  process.exit(1);
});