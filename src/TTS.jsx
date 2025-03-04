
import { useState } from "react";

const TTS = ({ text, targetLanguage }) => {
  const awsPollyLanguages = {
    "arb": "Arabic",
    "ar-AE": "Arabic (Gulf)",
    "ca-ES": "Catalan",
    "cs-CZ": "Czech",
    "cy-GB": "Welsh",
    "da-DK": "Danish",
    "de-DE": "German",
    "de-AT": "German (Austrian)",
    "de-CH": "German (Swiss)",
    "en-AU": "English (Australian)",
    "en-GB": "English (British)",
    "en-GB-WLS": "English (Welsh)",
    "en-IN": "English (Indian)",
    "en-IE": "English (Irish)",
    "en-NZ": "English (New Zealand)",
    "en-SG": "English (Singaporean)",
    "en-ZA": "English (South African)",
    "en-US": "English (US)",
    "es-ES": "Spanish (Spain)",
    "es-MX": "Spanish (Mexican)",
    "es-US": "Spanish (US)",
    "fi-FI": "Finnish",
    "fr-FR": "French",
    "fr-BE": "French (Belgian)",
    "fr-CA": "French (Canadian)",
    "hi-IN": "Hindi",
    "is-IS": "Icelandic",
    "it-IT": "Italian",
    "ja-JP": "Japanese",
    "ko-KR": "Korean",
    "nb-NO": "Norwegian",
    "nl-NL": "Dutch",
    "nl-BE": "Dutch (Belgian)",
    "pl-PL": "Polish",
    "pt-BR": "Portuguese (Brazilian)",
    "pt-PT": "Portuguese (European)",
    "ro-RO": "Romanian",
    "ru-RU": "Russian",
    "sv-SE": "Swedish",
    "tr-TR": "Turkish",
    "yue-CN": "Chinese (Cantonese)",
    "cmn-CN": "Chinese (Mandarin)",
    "zh-CN": "Chinese (Simplified)",
    "zh-TW": "Chinese (Traditional)",
    "bn-IN": "Bengali (India)"
  };
  
  function  getSpeakerRegion(code){
    const key = Object.keys(awsPollyLanguages).find(k => k.includes(code));
    return key;
}

  const callLambda = async () => {
    const apiUrl = "https://cxx2cg4e8a.execute-api.eu-west-2.amazonaws.com/test/ttsLambda"; 

    const requestData = {
        text: text,
        language: targetLanguage,
    };

  
   
    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
      
            },
            body: JSON.stringify(requestData),
        });

        const data = await response.json();
   

        if (data.audioBase64) {
            const audio = new Audio(`data:audio/mp3;base64,${data.audioBase64}`);
            audio.play();
        } else {
            console.error("No audio received:", data);
        }
    } catch (error) {
        console.error("Error calling Lambda:", error);
    }
};




  return (
    <div>
      <button onClick={() => callLambda()}>HEAR</button>
    </div>
  );  
};

export default TTS;
