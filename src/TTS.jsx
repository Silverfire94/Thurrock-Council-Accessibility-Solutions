import { useState } from "react";




let codes = {
  "af": "af-ZA",
  "sq": "sq-AL",
  "am": "am-ET",
  "ar": "ar-SA",
  "hy": "hy-AM",
  "az": "az-AZ",
  "bn": "bn-BD",
  "bs": "bs-BA",
  "bg": "bg-BG",
  "ca": "ca-ES",
  "zh": "zh-CN",
  "zh-TW": "zh-TW",
  "hr": "hr-HR",
  "cs": "cs-CZ",
  "da": "da-DK",
  "nl": "nl-NL",
  "en": "en-US",
  "et": "et-EE",
  "fa": "fa-IR",
  "fa-AF": "fa-AF",
  "tl": "fil-PH",
  "fi": "fi-FI",
  "fr": "fr-FR",
  "fr-CA": "fr-CA",
  "ka": "ka-GE",
  "de": "de-DE",
  "el": "el-GR",
  "gu": "gu-IN",
  "ht": "ht-HT",
  "ha": "ha-NG",
  "he": "he-IL",
  "hi": "hi-IN",
  "hu": "hu-HU",
  "is": "is-IS",
  "id": "id-ID",
  "ga": "ga-IE",
  "it": "it-IT",
  "ja": "ja-JP",
  "kn": "kn-IN",
  "kk": "kk-KZ",
  "ko": "ko-KR",
  "lv": "lv-LV",
  "lt": "lt-LT",
  "mk": "mk-MK",
  "ms": "ms-MY",
  "ml": "ml-IN",
  "mt": "mt-MT",
  "mr": "mr-IN",
  "mn": "mn-MN",
  "no": "nb-NO",
  "ps": "ps-AF",
  "pl": "pl-PL",
  "pt": "pt-BR",
  "pt-PT": "pt-PT",
  "pa": "pa-IN",
  "ro": "ro-RO",
  "ru": "ru-RU",
  "sr": "sr-RS",
  "si": "si-LK",
  "sk": "sk-SK",
  "sl": "sl-SI",
  "so": "so-SO",
  "es": "es-ES",
  "es-MX": "es-MX",
  "sw": "sw-KE",
  "sv": "sv-SE",
  "ta": "ta-IN",
  "te": "te-IN",
  "th": "th-TH",
  "tr": "tr-TR",
  "uk": "uk-UA",
  "ur": "ur-PK",
  "uz": "uz-UZ",
  "vi": "vi-VN",
  "cy": "cy-GB"
}

const TTS = ({ text, targetLanguage }) => {
  // const [textToSpeak, settextToSpeak] = useState(""); 
  // const [loading, setLoading] = useState(false); 


  // const handleSpeak = async () => {
  //   const utterance = new SpeechSynthesisUtterance(text);
  //   const voices = speechSynthesis.getVoices();
 
  //   if (!voices.length) {
  //     console.warn("Voices not available yet, retrying...");
  //     setTimeout(() => handleSpeak(text), 500);
  //     return;
  //   }

  //   //Set up  voice and language
  //   console.log(text)
  //   utterance.voice = voices.find(v => v.lang.startsWith("en")) || voices[0];
  //   speechSynthesis.speak(utterance);

  // }

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
        console.log("Lambda Response:", data);

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
