import path from 'path';
import { fileURLToPath } from 'url';
import { YtDlp, type VideoInfo, type VideoProgress } from 'ytdlp-nodejs';

import FileInfo from '../models/FileInfo.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class AudioService {
    private ytdlp!: YtDlp;
    private outputDir: string = path.resolve(__dirname, '../..', 'temp');

    constructor() {
        this.ytdlp = new YtDlp();
    }

    public async download({ url }: { url: string }): Promise<void> {
        try {
            const outputPath = path.resolve(this.outputDir, `temp.%(ext)s`);

            await this.ytdlp.downloadAsync(url, {
                format: 'bestaudio',
                output: outputPath.replace(/\s+\./g, '.'),
                onProgress: (progress: VideoProgress) => this.showPercent(progress),
            });

            console.log(`\nDownload concluído em: ${this.outputDir}`);
        } catch (e) {
            console.error('Error:', e);
        }
    }

    public async getInfo({ url }: { url: string }): Promise<FileInfo> {
        try {
            const info: VideoInfo = await this.ytdlp.getInfoAsync(url) as VideoInfo;
            return new FileInfo(info.title, info.uploader);
        } catch (e) {
            console.error('Error:', e);
            throw e;
        }
    }

    private showPercent(progress: VideoProgress): void {
        const { percentage_str } = progress;

        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        process.stdout.write(`Progress download: ${percentage_str}`);
    }
}
