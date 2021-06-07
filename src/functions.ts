import { promisify } from "util";
const exec = promisify(require("child_process").exec);

export async function run(command: any) {
    console.log("$", command);
    const { stderr, stdout } = await exec(command);
    stderr && console.error(stderr);
    stdout && console.log(stdout);

    return { stderr, stdout };
}
