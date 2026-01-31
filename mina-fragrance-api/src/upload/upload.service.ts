import { Injectable } from '@nestjs/common';
import { unlink } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class UploadService {
  getFileUrl(filename: string): string {
    return `/uploads/${filename}`;
  }

  async deleteFile(filename: string): Promise<void> {
    try {
      const filePath = join(__dirname, '..', '..', 'uploads', filename);
      await unlink(filePath);
    } catch (error) {
      console.error(`Erreur lors de la suppression du fichier: ${filename}`, error);
    }
  }
}
