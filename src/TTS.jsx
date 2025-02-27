import { useState } from "react";
// import { Translator } from "./Translator";

const TTS = ({ text, targetLanguage }) => {
  const [simplifiedText, setSimplifiedText] = useState(""); 
  const [loading, setLoading] = useState(false); 


   const handleSpeak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();
    if (!voices.length) {
        console.warn("Voices not available yet, retrying...");
        setTimeout(() => handleSpeak(text), 500);
        return;
    }
//Set up  voice and language
    utterance.voice = voices.find(v => v.lang.startsWith("en")) || voices[0];

    speechSynthesis.speak(utterance);
};

return (
    <div>
      <button onClick={() => handleSpeak(text)}>HEAR</button>
    </div>
  );
      
};

export default TTS;
