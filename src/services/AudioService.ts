import { Service } from "@midnightjd/core";

import FileInfo from "../models/FileInfo";
import Ytdlp from "../infra/YtdlpBuilder";

@Service
export default class AudioService {
    public async getInfo(url: string): Promise<FileInfo> {
        const { title, uploader } = await Ytdlp.builder()
            .url(url)
            .add('--js-runtimes', 'node')
            .json()
            .execute<{ title: string, uploader: string }>();

        return new FileInfo(title, uploader);
    }

    public async downloadAudio(url: string): Promise<void> {
        await Ytdlp.builder()
            .url(url)
            .add('--js-runtimes', 'node')
            .add('--add-metadata')
            .extractAudio()
            .format('mp3')
            .outputDir('./downloads/audio.%(ext)s')
            .execute();
    }
}