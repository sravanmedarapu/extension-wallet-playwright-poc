// utils.ts
import fs from 'fs';
import path from 'path';

export function getSecretPhraseFromFile(filePath: string): string[] {
    console.log("Getting secret phrase from file");
    let secretPhrase: string[] = [];
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const lines = data.split('\n');
        for (let line of lines) {
            console.log("Secret Phrase is - " + line);
            secretPhrase = line.split(" ");
        }
    } catch (e) {
        console.error(e);
    }
    return secretPhrase;
}