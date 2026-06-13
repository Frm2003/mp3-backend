import { spawn } from 'child_process';

import YtdlpJsonBuilder from './YtdlpJsonBuilder';
import YtdlpExtractBuilder from './YtdlpExtractBuilder';

export default class YtdlpBuilder {
    private args: string[];
    private urlArg: string;

    constructor() {
        this.args = [];
        this.urlArg = '';
    }

    public static builder() {
        return new YtdlpBuilder();
    }

    public add(...args: string[]): this {
        this.args.push(...args);
        return this;
    }

    public url(url: string): this {
        this.urlArg = url;
        return this;
    }

    public json(): YtdlpJsonBuilder {
        return new YtdlpJsonBuilder([...this.args, '-J'], this.urlArg);
    }

    public extractAudio(): YtdlpExtractBuilder {
        return new YtdlpExtractBuilder([...this.args, '-x'], this.urlArg);
    }
}