import { Service } from '@midnightjd/core';

import fs from 'fs/promises';

@Service
export default class FileService {
    public async createDir(dirPath: string): Promise<void> {
        await fs.mkdir(dirPath, { recursive: true });
    }

    public async pathExists(targetPath: string): Promise<boolean> {
        try {
            await fs.access(targetPath);
            return true;
        } catch {
            return false;
        }
    }

    public async writeFile(filePath: string, data: Uint8Array): Promise<void> {
        await fs.writeFile(filePath, data);
    }

    public async readFile(filePath: string, encoding: BufferEncoding = "utf-8"): Promise<string> {
        return fs.readFile(filePath, { encoding });
    }

    public async deleteFile(filePath: string): Promise<void> {
        await fs.unlink(filePath);
    }

    public async chmod(filePath: string, mode: number): Promise<void> {
        await fs.chmod(filePath, mode);
    }
}