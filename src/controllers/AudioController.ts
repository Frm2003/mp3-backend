import type { FastifyReply, FastifyRequest } from "fastify";
import FileService from "../service/FileService.ts";
import type FileInfo from "../models/FileInfo.ts";
import AudioService from "../service/AudioService.ts";

interface Audio {
    url: string;
}

class AudioController {
    private fileInfo!: FileInfo;
    private audioService!: AudioService;

    constructor(audioService: AudioService) {
        this.audioService = audioService;
    }

    public getInfo = async (req: FastifyRequest<{ Body: Audio }>, res: FastifyReply): Promise<void> => {
        const { url } = req.body;
        const info = await this.audioService.getInfo({ url });
        res.status(200).send(info);
    };

    public downloadFile = async (req: FastifyRequest<{ Body: Audio }>, res: FastifyReply): Promise<void> => {
        const { url } = req.body;
        await this.audioService.download({ url });
        res.status(200).send();
    };

    public streamFile = async (_: FastifyRequest, res: FastifyReply) => {
        const buffer = await FileService.readFile();
        res
            .status(200)
            .header("Content-Type", "audio/webm")
            .send(buffer);

        //await FileService.deleteFile();
    };
}

const audioService = new AudioService();

const audioController = new AudioController(audioService);
export default audioController;