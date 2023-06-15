import type { Dictionary, EntityManager } from "@mikro-orm/core";
import { Seeder } from '@mikro-orm/seeder';
import fs from "fs/promises";
import { UploadFileToMinio } from "../../plugins/minio.js";

export class MinioSeeder extends Seeder {
    async run(em: EntityManager, context: Dictionary): Promise<void> {

        // Cheeky throw dog.jpg into Minio
        const dogfile = await fs.readFile("1.jpg");
        const file = {
            file: dogfile,
            filename: "1.jpg",
        }
        await UploadFileToMinio(file);
        const dog2file = await fs.readFile("2.jpg");
        const file2 = {
            file2: dog2file,
            filename: "2.jpg",
        }
        await UploadFileToMinio(file2);
        const dogfile3 = await fs.readFile("3.jpg");
        const file3 = {
            file3: dogfile3,
            filename: "3.jpg",
        }
        await UploadFileToMinio(file3);
        const dogfile4 = await fs.readFile("1.jpg");
        const file4 = {
            file4: dogfile4,
            filename: "4.jpg",
        }
        await UploadFileToMinio(file4);
    }
}
