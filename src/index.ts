import { run } from "@probot/adapter-github-actions";
import app = require("./app");

run(app).catch((error) => {
  console.error(error);
  process.exit(1);
});