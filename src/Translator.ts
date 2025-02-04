import { generateClient } from 'aws-amplify/data';
import { type Schema } from '../amplify/data/resource';

export async function Translator(language: string, text:string) {
    console.log(language["code"]);
    const client = generateClient<Schema>();


    const { data } = await client.queries.translate({
        sourceLanguage: "en",
        targetLanguage: language["code"],
        text: "Hello World!",
    });

    console.log(data);

    return data;
}