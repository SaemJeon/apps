import { Probot } from "probot";

export = (app: Probot) => {
    app.log("Probot app started");

    app.on("issues.opened", async (context) => {
        const issueComment = context.issue({
            body: "Thanks for opening this issue!",
        });
        await context.octokit.issues.createComment(issueComment);
    });

    app.on("issue_comment.created", async (context) => {
        const issueComment = context.issue({
            body: "Thanks for your comment!",
        });
        await context.octokit.issues.createComment(issueComment);
    });

    app.on("issues.assigned", async (context) => {
        const issueComment = context.issue({
            body: "It is assigned.",
        });
        await context.octokit.issues.createComment(issueComment);
    });

    app.on("pull_request.labeled", async (context) => {
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

