import { useState } from "react";
import { Translator } from "./Translator";

const TextSimplificator = ({ text, targetLanguage }) => {
  const [simplifiedText, setSimplifiedText] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [showText, setShowText] = useState(false);

  const callLambdaFunction = async (textToSimplify) => {
    setShowText(!showText)
    if(showText) return;
    if (simplifiedText) {
      setSimplifiedText(""); 
    }
    try {
      setLoading(true);
      
      const apiUrl = "https://w1x9sft0lg.execute-api.eu-west-2.amazonaws.com/dev/simplify";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: `Simplify the following text within 150 words.Do not provide an explanation, just give a summary. the text is the following: ${textToSimplify}` }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      

     
      const outputText = data.output || "No simplified text available.";


      let translatedText = targetLanguage ? await Translator(targetLanguage, outputText) : outputText;

      setSimplifiedText(translatedText);
      
    } catch (error) {
      console.error("Error calling Lambda:", error);
      setSimplifiedText("Error simplifying text.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={() => callLambdaFunction(text)} disabled={loading}>
        {loading ? "Simplifying..." : "Simplify Text"}
      </button>

      {showText && (
        <div style={{ marginTop: "10px", padding: "10px", border: "1px solid #ddd", background: "#f9f9f9" }}>
          <strong>Simplified Text:</strong>
          <div>{simplifiedText}</div>
        </div>
      )}
    </div>
  );
};

export default TextSimplificator;
