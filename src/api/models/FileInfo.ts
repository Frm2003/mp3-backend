export default class FileInfo {
    private title!: string;
    private uploader!: string;
    
    constructor (title: string, uploader: string) {
        this.title = title;
        this.uploader = uploader;
    }

    public getTitle(): string {
        return this.title;
    }

    public getUploader(): string {
        return this.uploader;
    }
}
