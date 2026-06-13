import YtdlpExecutor from './YtdlpExecutor';

export default class YtdlpJsonBuilder {
    private args: string[];
    private urlArg: string;

    constructor(args: string[], url: string) {
        this.args = [...args];
        this.urlArg = url;
    }

    public async execute<T>(): Promise<T> {
        const raw: string =
            await new YtdlpExecutor([...this.args, this.urlArg]).execute();

        try {
            return JSON.parse(raw) as T;
        } catch {
            throw new Error("Falha ao fazer parse do JSON retornado pelo yt-dlp");
        }
    }
}