export const handleSpeak = (text: string): void => {
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


  // const handleSpeak = () => {

  //     const utterance = new SpeechSynthesisUtterance("Whats up my ?");
  
  //     // Get available voices
  //     const voices = speechSynthesis.getVoices();
  //     // Ensure voices are available
  //     if (!voices.length) {
  //         console.warn("Voices not available yet, retrying...");
  //         setTimeout(handleSpeak, 500);
  //         return;
  //     }
  
  //     // Select a voice
  //     utterance.voice = voices.find(v => v.lang.startsWith("en")) || voices[0];
  
  //     speechSynthesis.speak(utterance);
  
  



  // };