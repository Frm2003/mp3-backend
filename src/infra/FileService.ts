import { Service } from '@midnightjd/core';

import fs from 'fs/promises';

@Service
export default class FileService {
    public async createDir(dirPath: string): Promise<void> {
        await fs.mkdir(dirPath, { recursive: true });
    }

    public async exists(targetPath: string): Promise<boolean> {
        try {
            await fs.access(targetPath);
            return true;
        } catch {
            return false;
        }
    }

    public async write(filePath: string, data: Uint8Array): Promise<void> {
        await fs.writeFile(filePath, data);
    }

    public async read(filePath: string): Promise<Buffer> {
        return fs.readFile(filePath);
    }

    public async delete(filePath: string): Promise<void> {
        await fs.unlink(filePath);
    }
}