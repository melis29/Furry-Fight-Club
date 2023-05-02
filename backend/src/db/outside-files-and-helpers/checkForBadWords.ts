import { promises as fs } from 'fs';

export async function readFileAsync(): Promise<string> {
	const fileContent = await fs.readFile('backend/src/db/outside-files-and-helpers/badwords.txt', 'utf-8');
	return fileContent;
}

