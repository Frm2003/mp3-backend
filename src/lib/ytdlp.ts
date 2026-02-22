import path from "path";

import { spawn } from "child_process";

const isWindows = process.platform === "win32";
const ytDlpBinary = isWindows ? "yt-dlp.exe" : "yt-dlp";
const ytDlpPath = path.resolve(process.cwd(), "bin", ytDlpBinary);
const outputDirPath = path.resolve(process.cwd(), "temp");
const cookiesPath = path.resolve(process.cwd(), "temp/cookies.txt");

export default class Ytdlp {

    public async getInfo(url: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const yt = spawn(ytDlpPath, ["-J", url, "--js-runtimes", "node"]);

            let stdout = "";
            let stderr = "";

            yt.stdout.on("data", chunk => {
                stdout += chunk.toString();
            });

            yt.stderr.on("data", chunk => {
                stderr += chunk.toString();
            });

            yt.on("error", reject);

            yt.on("close", code => {
                if (code !== 0) {
                    return reject(new Error(stderr || "yt-dlp falhou"));
                }

                try {
                    const json = JSON.parse(stdout);
                    resolve(json);
                } catch (err) {
                    reject(new Error("Falha ao fazer parse do JSON"));
                }
            });
        });
    }

    public async downloadMp3(url: string): Promise<void> {
        return new Promise((resolve) => {
            const yt = spawn(ytDlpPath, [
                "-x",
                "--audio-format", "mp3",
                "--cookies", cookiesPath,
                "-o", `${outputDirPath}/%(title)s.%(ext)s`,
                "--js-runtimes", "node",
                url
            ]);

            yt.stderr.on("data", data => {
                process.stdout.write(data.toString());
            });

            yt.on("close", () => {
                resolve();
            });
        });
    }
}