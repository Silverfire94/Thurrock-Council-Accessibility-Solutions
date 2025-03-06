import { Text } from "@mantine/core"
import { Translator } from "./Translator"
import { useEffect, useState } from "react"

const RenderDocument = ({ doc, targetLanguage="es" }) => {
    const [originalText, setOriginalText] = useState("");
    const [translatedText, setTranslatedText] = useState("");

    useEffect(() => {

        const getText = async () => {
            try {
                const response = await fetch(`./documents/${doc}.txt`)
                const text = await response.text()
                console.log("Test: ", text)
                setOriginalText(text)
            } catch(error) {
                console.error("Error loading document:", error)
                setOriginalText("Error")
            }
        }
        
        const translateText = async () => {
            try {
                const translatedText = await Translator(targetLanguage, originalText) ?? "err"
                setTranslatedText(translatedText)
            } catch (error) {
                console.error("Error loading or translating text:", error)
            }
        }
    
        getText();
        // Don't run Translator if user has already selected english
        if (targetLanguage === "en") setTranslatedText(originalText)
        translateText();
    }, [doc, targetLanguage])
    
    return <Text>{translatedText}</Text>
}

export default RenderDocument