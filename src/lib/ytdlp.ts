import path from "path";

import { spawn } from "child_process";
import { existsSync, mkdirSync, writeFileSync } from "fs";

const outputDirPath = path.resolve(process.cwd(), "temp");
const cookiesPath = path.resolve(process.cwd(), "temp", "cookies.txt");

export default class Ytdlp {
    declare ytDlpPath: string;
    declare tempCookiePath: string;

    constructor() {
        const ytDlpBinary = process.platform === "win32" ? "yt-dlp.exe" : "yt-dlp";
        this.ytDlpPath = path.resolve(process.cwd(), "bin", ytDlpBinary);

        this.ensureTempFolder();
        this.writeCookiesFile();
    }

    public async getInfo(url: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const yt = spawn(this.ytDlpPath, ["-J", url, "--js-runtimes", "node"]);

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
        await new Promise<void>((resolve, reject) => {
            const yt = spawn(this.ytDlpPath, [
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

            yt.on("error", reject);

            yt.on("close", () => {
                resolve();
            });

        });
    }

    private ensureTempFolder() {
        if (!existsSync(outputDirPath)) {
            mkdirSync(outputDirPath, { recursive: true });
        }
    }

    private writeCookiesFile(): void {
        const cookieContent = Buffer
            .from(process.env.COOKIES_ENCRYPTED!, "base64")
            .toString("utf-8");

        if (!cookieContent) {
            throw new Error("YT_COOKIES not defined");
        }

        writeFileSync(cookiesPath, cookieContent);
    }
}