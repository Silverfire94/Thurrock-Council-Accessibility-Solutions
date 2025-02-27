import { getSpeech } from "./TextToSpeech"
import.meta.env.VITE_TEST

function Test() {

    const handleClick = async () => {
        let response = await getSpeech("Alex is a Letard");
        console.log(response);
    }
  
    return (
        <>
            <h1>{import.meta.env.VITE_TEST}</h1>
            <button onClick={(e) => handleClick()}>Speak</button>
        </>
    )
}

export default Test