import { generateClient } from 'aws-amplify/data';
import { type Schema } from '../amplify/data/resource';

export async function Translator(language: string, text:string) {
    const client = generateClient<Schema>();

    const { data } = await client.queries.translate({
        sourceLanguage: "en",
        targetLanguage: language,
        text: text,
    });

    return data;
}

interface Questions {
    question: string, 
    type:string, 
    answers: string[]
}

export async function handleClick(code: string, oldItems:Questions[]){
    for (let i = 0; i < oldItems.length; i++) {
        oldItems[i].question = await Translator(code, oldItems[i].question) ?? "err"
        if(oldItems[i].type === "checkbox" || oldItems[i].type === "radio" || oldItems[i].type === "radio"){
            for (let j = 0; j < oldItems[i].answers.length; j++) {
                oldItems[i].answers[j] = await Translator(code, oldItems[i].answers[j]) ?? "err"
            }
        }
    }
}

interface Answers {
    name: string, 
    label: string,
    type:string, 
    options: string[],
    data: string[]
}

// export async function translateForm(code: string, answers:Questions[]){
//     for (let i = 0; i < oldItems.length; i++) {
//         oldItems[i].question = await Translator(code, oldItems[i].question) ?? "err"
//         if(oldItems[i].type === "checkbox" || oldItems[i].type === "radio" || oldItems[i].type === "radio"){
//             for (let j = 0; j < oldItems[i].answers.length; j++) {
//                 oldItems[i].answers[j] = await Translator(code, oldItems[i].answers[j]) ?? "err"
//             }
//         }
//     }
// }