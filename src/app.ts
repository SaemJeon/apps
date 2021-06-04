import { Probot } from "probot";

export = (app: Probot) => {
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
    // For more information on building apps:
    // https://probot.github.io/docs/

    // To get your app running against GitHub, see:
    // https://probot.github.io/docs/development/
};