import path from 'path';
import { promises as fs } from "fs";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.resolve(__dirname, '../..', 'temp');

export default class FileService {
    public static async readFile(): Promise<Buffer> {
        try {
            return await fs.readFile(`${outputDir}/temp.webm`);
        } catch (e) {
            console.error("Erro ao ler arquivo:", e);
            throw e;
        }
    }

    public static async deleteFile(): Promise<void> {
        try {
            await fs.unlink(`${outputDir}//temp.webm`);
        } catch (e) {
            console.error("Erro ao deletar arquivo:", e);
            throw e;
        }
    }
}
