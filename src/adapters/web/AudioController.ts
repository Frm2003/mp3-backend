import { RequestBody, RequestMapping, RestController } from "@midnightjd/web";

import AudioService from "../../services/AudioService";
import AudioDto from "../dto/AudioDto";
import FileInfo from "../../models/FileInfo";
import FileService from "../../infra/FileService";

@RestController("/audio")
export default class AudioController {
    constructor(
        private readonly audioService: AudioService,
        private readonly fileService: FileService,
    ) {}

    @RequestMapping({ httpMethod: 'POST' })
    public async getInfo(@RequestBody dto: AudioDto): Promise<FileInfo> {
        return await this.audioService.getInfo(dto.url);
    }

    @RequestMapping({ httpMethod: 'POST', path: '/download' })
    public async downloadAudio(@RequestBody dto: AudioDto): Promise<void> {
        await this.audioService.downloadAudio(dto.url);
    }

    @RequestMapping({ httpMethod: 'GET' })
    public async getFile(): Promise<Buffer> {
        return this.fileService.read('./downloads/audio.webm');
    }
}