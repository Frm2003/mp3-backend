import { spawn } from "child_process";
import path from "path";

export default class YtdlpExecutor {
    private args: string[];

    private static readonly BIN_PATH: string = path.resolve(process.cwd(), 'bin', 'yt-dlp');

    constructor(args: string[]) {
        this.args = args;
    }

    public async execute(): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            const yt = spawn(YtdlpExecutor.BIN_PATH, this.args);

            const chunks: Buffer[] = [];
            let stderr = "";

            yt.stdout.on("data", (chunk: Buffer) => {
                chunks.push(chunk);
            });

            yt.stderr.on("data", (chunk: Buffer) => {
                stderr += chunk.toString();
            });

            yt.on("error", reject);

            yt.on("close", (code) => {
                // if (code !== 0) {
                //     return reject(new Error(stderr));
                // }

                resolve(Buffer.concat(chunks));
            });
        });
    }
}