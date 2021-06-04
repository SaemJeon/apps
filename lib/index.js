"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var probot_1 = require("probot");
var app = require("./app");
probot_1.run(app).catch(function (error) {
    console.error(error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map