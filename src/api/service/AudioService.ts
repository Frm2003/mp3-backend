import Ytdlp from "../../lib/ytdlp.js";
import FileInfo from "../models/FileInfo.js";

export default class AudioService {
    private declare ytdlp: Ytdlp;

    constructor() {
        this.ytdlp = new Ytdlp();
    }

    public async getInfo({ url }: { url: string }): Promise<FileInfo> {
        try {
            const response = await this.ytdlp.getInfo(url);
            return new FileInfo(response.title, response.uploader);
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    public async dowloadMp3({ url }: { url: string }) {
        try {
            await this.ytdlp.downloadMp3(url);
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
}

new AudioService().getInfo({ url: "https://www.youtube.com/watch?v=A_qCxsXRFr0" });