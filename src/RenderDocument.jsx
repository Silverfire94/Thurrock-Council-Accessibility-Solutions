import { useState, useEffect } from "react";

const RenderDocument = ({ text, targetLanguage="es" }) => {

    return <pre>{text}</pre>
}

export default RenderDocument