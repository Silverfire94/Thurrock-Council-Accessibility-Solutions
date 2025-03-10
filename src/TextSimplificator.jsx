// import { useState } from "react";
// import { Translator } from "./Translator";

// const TextSimplificator = ({ text, targetLanguage }) => {
//   const [simplifiedText, setSimplifiedText] = useState(""); 
//   const [loading, setLoading] = useState(false); 


//   const callLambdaFunction = async (textToSimplify) => {
//     if (simplifiedText) {
//         setSimplifiedText(false);
//         return
//     }
//     try {
//       setLoading(true);
//       const response = await fetch(
//         "https://w1x9sft0lg.execute-api.eu-west-2.amazonaws.com/dev/simplify",
//         {
//           method: "POST",
//           mode: "cors",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ prompt: `Simplify the following text. Do not include any introduction, explanations, or extra words—just return the simplified version, the text is the following: ${textToSimplify}` }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log("API Response:", data); 

//       let translatedText = await Translator(targetLanguage, data.results[0].outputText);

      

      
//       console.log("WHYYY")
//       setSimplifiedText(translatedText || "No simplified text available.");

//     } catch (error) {
//       console.error("Error calling Lambda:", error);
//       setSimplifiedText("Error simplifying text.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <button onClick={() => callLambdaFunction(text)} disabled={loading}>
//         {loading ? "Simplifying..." : "Simplify Text"}
//       </button>

    
//       {simplifiedText && (
//         <div style={{ marginTop: "10px", padding: "10px", border: "1px solid #ddd", background: "#f9f9f9" }}>
//           <strong>Simplified Text :</strong>
//           <div>{typeof simplifiedText === "string" ? simplifiedText : JSON.stringify(simplifiedText)}</div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TextSimplificator;

import { useState } from "react";
import { Translator } from "./Translator";

const TextSimplificator = ({ text, targetLanguage }) => {
  const [simplifiedText, setSimplifiedText] = useState(""); 
  const [loading, setLoading] = useState(false); 

  const callLambdaFunction = async (textToSimplify) => {
    if (simplifiedText) {
      setSimplifiedText(""); // ✅ Reset previous results instead of setting to false
      return;
    }

    try {
      setLoading(true);
      
      const apiUrl = "https://w1x9sft0lg.execute-api.eu-west-2.amazonaws.com/dev/simplify"; // API Gateway URL

      // const requestBody = {
      //   anthropic_version: "bedrock-2023-05-31", // ✅ Required for Claude 3 API
      //   messages: [
      //     {
      //       role: "user",
      //       content: `Simplify the following text: ${textToSimplify}. Do not include introductions or extra words, just return the simplified version.`
      //     }
      //   ],
      //   max_tokens: 512, // ✅ Keep within Claude 3 limits
      //   temperature: 0.7,
      //   top_p: 0.9
      // };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: `Simplify the following text. Do not include any introduction, explanations, or extra words—just return the simplified version, the text is the following: ${textToSimplify}` }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      // ✅ Extract model output correctly from API response
      const outputText = data.output || "No simplified text available.";

      // ✅ Optional: Translate if needed
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

      {simplifiedText && (
        <div style={{ marginTop: "10px", padding: "10px", border: "1px solid #ddd", background: "#f9f9f9" }}>
          <strong>Simplified Text:</strong>
          <div>{simplifiedText}</div>
        </div>
      )}
    </div>
  );
};

export default TextSimplificator;
