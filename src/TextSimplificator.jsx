export const invokeBedrock = async (inputText) => {
    const invokeUrl = "https://b71cq60cc2.execute-api.eu-west-2.amazonaws.com/dev"; // Replace with your actual API Gateway Invoke URL

    try {
        const response = await fetch(invokeUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt: inputText }) // Adjust based on your Lambda function's expected format
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error calling AWS API Gateway:", error);
        throw error;
    }
};
