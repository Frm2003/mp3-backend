import path from 'path';
import { promises as fs } from "fs";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.resolve(__dirname, '../../..', 'temp');

export default class FileService {
    public static async readFile(): Promise<Buffer> {
        try {
            const files = await fs.readdir(outputDir);

            const fileName = files.find(f => path.extname(f).toLowerCase() === '.webm'.toLowerCase());

            if (!fileName)
                throw new Error(`Nenhum arquivo com a extensão .webm encontrado`);

            const filePath = path.join(outputDir, fileName);

            return await fs.readFile(filePath);
        } catch (e) {
            console.error("Erro ao ler arquivo:", e);
            throw e;
        }
    }

    public static async deleteFile(): Promise<void> {
        try {
            const files = await fs.readdir(outputDir);

            const fileName = files.find(f => path.extname(f).toLowerCase() === '.webm'.toLowerCase());

            if (!fileName)
                throw new Error(`Nenhum arquivo com a extensão .webm encontrado`);

            const filePath = path.join(outputDir, fileName);

            await fs.unlink(filePath);
        } catch (e) {
            console.error("Erro ao deletar arquivo:", e);
            throw e;
        }
    }
}
