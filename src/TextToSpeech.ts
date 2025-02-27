import { PollyClient, SynthesizeSpeechCommand } from "@aws-sdk/client-polly"; // ES Modules import
// const { PollyClient, SynthesizeSpeechCommand } = require("@aws-sdk/client-polly"); // CommonJS import

export async function getSpeech(text:string) {
    const client = new PollyClient();
    const input = {
        "LexiconNames": [
        "example"
        ],
        "OutputFormat": "mp3",
        "SampleRate": "8000",
        "Text": "All Gaul is divided into three parts",
        "TextType": "text",
        "VoiceId": "Joanna"
    };
    const command = new SynthesizeSpeechCommand(input);
    const response = await client.send(command);

    return response;
}