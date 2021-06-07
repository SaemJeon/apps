import { Probot } from "probot";
import commands from "probot-commands";

export = (app: Probot) => {
    app.log("Probot app started");

    commands(app, "label", (context: any, command: any) => {
        const labels = command.arguments.splot(/, */);
        app.log("HELLO");
        return context.github.issues.addLabels(context.issue({ labels }));
    });

    app.on("pull_request.labeled", async (context) => {
        if (context.payload.label?.name == "extract-api") {
            if (context.payload.pull_request.mergeable_state == "clean") {
                await context.octokit.issues.createComment(context.issue({
                    body: "Executing rush extract-api",
                }));
            } else {
                await context.octokit.issues.createComment(context.issue({
                    body: `This branch, ${context.payload.pull_request.head.ref}, is not up-to-date with the target branch, ${context.payload.pull_request.base.ref}`,
                }));
            }
            await context.octokit.issues.removeLabel(context.issue({
                name: "extract-api"
            }));
        }
    });
};

