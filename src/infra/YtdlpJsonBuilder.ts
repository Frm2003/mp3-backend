import YtdlpExecutor from './YtdlpExecutor';

export default class YtdlpJsonBuilder {
    private args: string[];
    private urlArg: string;

    constructor(args: string[], url: string) {
        this.args = [...args];
        this.urlArg = url;
    }

    public async execute<T>(): Promise<T> {
        const buffer: Buffer = await new YtdlpExecutor([...this.args, this.urlArg]).execute();

        const text = buffer.toString("utf-8");

        try {
            return JSON.parse(text) as T;
        } catch {
            throw new Error("Falha ao fazer parse do JSON retornado pelo yt-dlp");
        }
    }
}