import YtdlpExecutor from "./YtdlpExecutor";

export default class YtdlpExtractBuilder {
    private args: string[];
    private urlArg: string;

    constructor(args: string[], url: string) {
        this.args = [...args];
        this.urlArg = url;
    }

    public format(format: string): YtdlpExtractBuilder {
        this.args.push('--audio-format', format);
        return this;
    }

    public outputDir(path: string): YtdlpExtractBuilder {
        this.args.push('-o', path);
        return this;
    }

    public async execute(): Promise<void> {
        await new YtdlpExecutor([...this.args, this.urlArg]).execute();
    }
}