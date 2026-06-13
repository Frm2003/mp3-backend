import { spawn } from "child_process";
import path from "path";

export default class YtdlpExecutor {
    private args: string[];

    private static readonly BIN_PATH: string = path.resolve(process.cwd(), 'bin', 'yt-dlp');

    constructor(args: string[]) {
        this.args = args;
    }

    public async execute(): Promise<string> {
        return new Promise((resolve, reject) => {
            const yt = spawn(YtdlpExecutor.BIN_PATH, this.args);

            let stdout = "";
            let stderr = "";

            yt.stdout.on("data", c => stdout += c.toString());
            yt.stderr.on("data", c => stderr += c.toString());

            yt.on("error", reject);

            yt.on("close", code => {
                resolve(stdout);
            });
        });
    }
}