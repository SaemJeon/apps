import { Probot } from "probot";

export = (app: Probot) => {
    app.log("Probot app started");

    app.on("pull_request.labeled", async (context) => {
        app.log(context);
        app.log(context.payload.pull_request.base.ref);
        app.log(context.payload.pull_request.mergeable_state);
        if (context.payload.label?.name == "extract-api") {
            await context.octokit.issues.createComment(context.issue({
                body: "Executing rush extract-api",
            }));
            await context.octokit.issues.removeLabel(context.issue({
                name: "extract-api"
            }));
        }
    });
};

