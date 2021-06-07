import { Probot } from "probot";
import { run } from "./functions";

export = (app: Probot) => {
    app.log("Probot app started");

    app.on("pull_request.labeled", async (context) => {
        if (context.payload.label?.name == "extract-api") {
            const thisBranch = context.payload.pull_request.head.ref;
            const targetBranch = context.payload.pull_request.base.ref;

            if (context.payload.pull_request.mergeable_state == "clean") {
                await context.octokit.issues.createComment(context.issue({
                    body: "Executing rush extract-api",
                }));
            } else {
                // TODO: Delete this when ready
                run("pwd");
                run("echo hello");
                run("git config --local user.email 38288322+imodeljs-admin@users.noreply.github.com");
                run("git config --local user.name imodeljs-admin");
                run(`git checkout ${thisBranch}`);
                run("rush update");
                run("rush build");
                run("rush extract-api");
                run("git add .");
                run("git commit --amend --no-edit ");
                run("git push");
                await context.octokit.issues.createComment(context.issue({
                    body: `This branch, ${thisBranch}, is not up-to-date with the target branch, ${targetBranch}`,
                }));
            }
            await context.octokit.issues.removeLabel(context.issue({
                name: "extract-api"
            }));
        }
    });
};

