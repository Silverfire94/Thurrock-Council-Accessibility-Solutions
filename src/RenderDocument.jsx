import { useState, useEffect } from "react";

const RenderDocument = () => {
    const [text, setText] = useState("")

    useEffect(() => {
        fetch("/text1.txt")
            .then((response) => response.text())
            .then((data) => setText(data))
            .catch((error) => console.log("Error loading text file:", error))
    }, []);

    return <pre>{text}</pre>
}

export default RenderDocument