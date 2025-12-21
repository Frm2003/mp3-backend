export default class FileInfo {
    private fileName!: string;
    private uploader!: string;
    
    constructor (fileName: string, uploader: string) {
        this.fileName = fileName;
        this.uploader = uploader;
    }

    public getFileName(): string {
        return this.fileName;
    }

    public getUploader(): string {
        return this.uploader;
    }
}
