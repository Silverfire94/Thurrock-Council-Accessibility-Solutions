import { Text } from "@mantine/core"
import { Translator } from "./Translator"
import { useEffect, useState } from "react"
import TextSimplificator from "./TextSimplificator";
import TTS from "./TTS";

const RenderDocument = ({ text, targetLanguage="es", change }) => {
    const [translatedText, setTranslatedText] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const translateText = async () => {
            try {
                const translatedText = await Translator(targetLanguage, text) ?? "err"
                setTranslatedText(translatedText)
            } catch (error) {
                console.error("Error loading or translating text:", error)
            } finally {
                setLoading(false)
            }
        }
    
        // Don't run Translator if user has already selected english
        if (targetLanguage === "en") setTranslatedText(text)
        translateText();
    }, [targetLanguage])

    if (loading) {
        return <p>Loading document...</p>
    }
    
    return (
        <>
            <TextSimplificator text={text} targetLanguage={targetLanguage}/>
            <TTS text={text} targetLanguage={targetLanguage} change={change} />
            <Text>{translatedText}</Text>
        </>
    )
}

export default RenderDocument