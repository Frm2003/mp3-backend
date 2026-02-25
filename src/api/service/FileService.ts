import path from 'path';
import { promises as fs } from "fs";
import { fileURLToPath } from 'url';

export default class FileService {
    declare static __filename: string;
    declare static __dirname: string;
    declare static outputDir: string;

    static {
        this.__filename = fileURLToPath(import.meta.url);
        this.__dirname = path.dirname(this.__filename);
        this.outputDir = path.resolve(this.__dirname, '../../..', 'temp');
    }

    public static async readFile(): Promise<Buffer> {
        try {
            const files = await fs.readdir(this.outputDir);

            const fileName = files.find(f => path.extname(f).toLowerCase() === '.webm'.toLowerCase());

            if (!fileName)
                throw new Error(`Nenhum arquivo com a extensão .webm encontrado`);

            const filePath = path.join(this.outputDir, fileName);

            return await fs.readFile(filePath);
        } catch (e) {
            console.error("Erro ao ler arquivo:", e);
            throw e;
        }
    }

    public static async deleteFile(): Promise<void> {
        try {
            const files = await fs.readdir(this.outputDir);

            const fileName = files.find(f => path.extname(f).toLowerCase() === '.webm'.toLowerCase());

            if (!fileName)
                throw new Error(`Nenhum arquivo com a extensão .webm encontrado`);

            const filePath = path.join(this.outputDir, fileName);

            await fs.unlink(filePath);
        } catch (e) {
            console.error("Erro ao deletar arquivo:", e);
            throw e;
        }
    }
}
