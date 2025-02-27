import { getSpeech } from "./TextToSpeech"

function Test() {

    const handleClick = async () => {
        let response = await getSpeech("Alex is a Letard");
        console.log(response);
    }
  
    return (
        <>
            <button onClick={(e) => handleClick()}>Speak</button>
        </>
    )
}

export default Test 