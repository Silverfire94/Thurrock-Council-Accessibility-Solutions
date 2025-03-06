import React, { useState } from "react";
import { speak } from "espeak-ng";

const TTSComponent = () => {
    const [text, setText] = useState("Hello, I work offline!");
    const [voice, setVoice] = useState("en");
    const [speed, setSpeed] = useState(150);

    const handleSpeak = async () => {
        try {
            await speak(text, { voice, speed });
            console.log("Speech synthesis completed.");
        } catch (error) {
            console.error("Error in speech synthesis:", error);
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h2>Offline TTS with eSpeak</h2>
            <textarea 
                value={text} 
                onChange={(e) => setText(e.target.value)} 
                rows="3" 
                cols="40"
            />
            <div>
                <label>Voice: </label>
                <select value={voice} onChange={(e) => setVoice(e.target.value)}>
                    <option value="en">English</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="es">Spanish</option>
                    <option value="it">Italian</option>
                    <option value="ja">Japanese</option>
                </select>
            </div>
            <div>
                <label>Speed: </label>
                <input 
                    type="number" 
                    value={speed} 
                    onChange={(e) => setSpeed(Number(e.target.value))} 
                    min="80" 
                    max="300"
                />
            </div>
            <button onClick={handleSpeak} style={{ marginTop: "10px" }}>
                Speak
            </button>
        </div>
    );
};

export default TTSComponent;
