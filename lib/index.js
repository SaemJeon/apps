"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var adapter_github_actions_1 = require("@probot/adapter-github-actions");
var app = require("./app");
adapter_github_actions_1.run(app).catch(function (error) {
    console.error(error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map