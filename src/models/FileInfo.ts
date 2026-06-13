export default class FileInfo {
    title!: string;
    uploader!: string;

    constructor(title: string, uploader: string) {
        this.title = title;
        this.uploader = uploader;
    }
}