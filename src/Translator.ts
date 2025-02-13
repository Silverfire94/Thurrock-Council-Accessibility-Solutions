import { generateClient } from 'aws-amplify/data';
import { type Schema } from '../amplify/data/resource';

export async function Translator(slanguage: string, tLanguage, text:string) {
    const client = generateClient<Schema>();

    const { data } = await client.queries.translate({
        sourceLanguage: slanguage,
        targetLanguage: tLanguage,
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
        oldItems[i].question = await Translator("en", code, oldItems[i].question) ?? "err"
        if(oldItems[i].type === "checkbox" || oldItems[i].type === "radio" || oldItems[i].type === "radio"){
            for (let j = 0; j < oldItems[i].answers.length; j++) {
                oldItems[i].answers[j] = await Translator("en", code, oldItems[i].answers[j]) ?? "err"
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

export async function TranslateAnswers(code: string, answers:any){
    let formAnswers = JSON.parse(JSON.stringify(answers))
    if (code === "en"){
        return formAnswers
    }
    formAnswers.map(async (k,e) => {
        if (typeof(e) === "string") {
            e = await Translator("en", code, e) ?? "err"
        }
        if (Array.isArray(e)) {
            for (let item in e) {
                item = await Translator("en", code, item) ?? "err"
            }
        }
    })

    return formAnswers
}