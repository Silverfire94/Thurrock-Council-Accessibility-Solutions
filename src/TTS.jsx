import { IconVolume, IconPlayerPause } from "@tabler/icons-react";
import { ActionIcon } from "@mantine/core";
import { useState, useEffect, useRef } from "react";
import { Translator } from "./Translator"


const TTS = ({ text, targetLanguage, size="input-sm", change}) => {
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

  const langCode = {
    "af": "",  
    "sq": "",  
    "am": "",  
    "ar": "arb",  
    "ar-AE": "ar-AE",  
    "hy": "",  
    "az": "",  
    "bn": "",  
    "bs": "",  
    "bg": "",  
    "ca": "ca-ES",  
    "zh": "cmn-CN",  
    "zh-TW": "yue-CN",  
    "hr": "",  
    "cs": "cs-CZ",  
    "da": "da-DK",  
    "fa-AF": "",  
    "nl": "nl-NL",  
    "nl-BE": "nl-BE",  
    "en": "en-US",  
    "en-AU": "en-AU",  
    "en-GB": "en-GB",  
    "en-IN": "en-IN",  
    "en-NZ": "en-NZ",  
    "en-SG": "en-SG",  
    "en-ZA": "en-ZA",  
    "en-GB-WLS": "en-GB-WLS",  
    "et": "",  
    "fa": "",  
    "tl": "",  
    "fi": "fi-FI",  
    "fr": "fr-FR",  
    "fr-CA": "fr-CA",  
    "fr-BE": "fr-BE",  
    "ka": "",  
    "de": "de-DE",  
    "de-AT": "de-AT",  
    "de-CH": "de-CH",  
    "el": "",  
    "gu": "",  
    "ht": "",  
    "ha": "",  
    "he": "",  
    "hi": "hi-IN",  
    "hu": "",  
    "is": "is-IS",  
    "id": "",  
    "ga": "",  
    "it": "it-IT",  
    "ja": "ja-JP",  
    "kn": "",  
    "kk": "",  
    "ko": "ko-KR",  
    "lv": "",  
    "lt": "",  
    "mk": "",  
    "ms": "",  
    "ml": "",  
    "mt": "",  
    "mr": "",  
    "mn": "",  
    "no": "nb-NO",  
    "ps": "",  
    "pl": "pl-PL",  
    "pt": "pt-BR",  
    "pt-PT": "pt-PT",  
    "pa": "",  
    "ro": "ro-RO",  
    "ru": "ru-RU",  
    "sr": "",  
    "si": "",  
    "sk": "",  
    "sl": "",  
    "so": "",  
    "es": "es-ES",  
    "es-MX": "es-MX",  
    "es-US": "es-US",  
    "sw": "",  
    "sv": "sv-SE",  
    "ta": "",  
    "te": "",  
    "th": "",  
    "tr": "tr-TR",  
    "uk": "",  
    "ur": "",  
    "uz": "",  
    "vi": "",  
    "cy": "cy-GB"  
  }


  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);


  
  useEffect(() => {
    if(audioRef.current){
      audioRef.current.pause();
    }
  }, [])

  useEffect(() => {
    setIsDisabled(true)
    audioRef.current = null;
    setPlaying(false);
    const callLambda = async () => {
      const apiUrl = "https://cxx2cg4e8a.execute-api.eu-west-2.amazonaws.com/test/ttsLambda";
  
     
  
      try {
        const translatedText = await Translator(targetLanguage, text) ?? "err"
        const requestData = {
          text: translatedText,
          language: targetLanguage,
        };

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
          const newAudio = new Audio(`data:audio/mp3;base64,${data.audioBase64}`);
          audioRef.current = newAudio;
          setIsDisabled(false)
        } else {
            console.error("No audio received:", data);
        }
      } catch (error) {
          console.error("Error calling Lambda:", error);
      }
    };

    if (langCode[targetLanguage]) {
      callLambda();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [change, text, targetLanguage])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("ended", () => setPlaying(false))
    }
  }, [audioRef.current])
  
  function  getSpeakerRegion(code){
    const key = Object.keys(awsPollyLanguages).find(k => k.includes(code));
    return key;
  }

  const toggleAudio = () => {
    audioRef.current && playing ? audioRef.current.pause() : audioRef.current.play()
    setPlaying(!playing)
  }

  return (
    <ActionIcon size={size} variant="subtle" color="#3b943b" disabled={isDisabled} onClick={() => toggleAudio()} >
        {playing ? <IconPlayerPause stroke={1.5} /> : <IconVolume stroke={1.5} />}
    </ActionIcon>
  );  
};

export default TTS;
