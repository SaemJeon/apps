import { Probot } from "probot";

export = (app: Probot) => {
    app.log("Probot app started");

    app.on("pull_request.labeled", async (context) => {
        app.log(context);
        if (context.payload.label?.name == "extract-api") {
            const issueComment = context.issue({
                body: "Label is changed to extract-api",
            });
            await context.octokit.issues.createComment(issueComment);
            const label = context.issue({
                name: "extract-api"
            });
            await context.octokit.issues.removeLabel(label);
        }
    });
};

