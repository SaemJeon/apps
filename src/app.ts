import { Probot } from "probot";
import { exec } from "child_process";

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
                exec("git config --local user.email 38288322+imodeljs-admin@users.noreply.github.com");
                exec("git config --local user.name imodeljs-admin");
                exec(`git checkout ${thisBranch}`);
                exec("rush update");
                exec("rush build");
                exec("rush extract-api");
                exec("git add .");
                exec("git commit --amend --no-edit ");
            } else {
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

