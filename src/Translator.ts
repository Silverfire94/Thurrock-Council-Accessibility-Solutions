import { generateClient } from 'aws-amplify/data';
import { type Schema } from '../amplify/data/resource';

export async function Translator(slanguage: string, tLanguage: string, text:string) {
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
    for(let v in formAnswers){
        if (typeof(formAnswers[v]) === "string") {
            formAnswers[v] = await Translator(code, "en", formAnswers[v]) ?? "err"
        }
        if (Array.isArray(formAnswers[v])) {
            for (let item in formAnswers[v]) {
                formAnswers[v][item] = await Translator(code, "en", formAnswers[v][item]) ?? "err"
            }
        }
    }

    return formAnswers
}