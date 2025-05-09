import { useState, useEffect } from "react"
import { Translator } from "./Translator"
import FormGenerator from "./FormGenerator"

const TranslateForm = ({ formSchema, targetLanguage = "es" }) => {
    const [translatedSchema, setTranslatedSchema] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchAndTranslateSchema = async () => {
        try {
          const translatedSchema = await Promise.all(
            formSchema.map(async (field, index) => {
              const translatedLabel = await Translator(targetLanguage, field.label) ?? "err"
              let translatedOptions = field.options
                ? await Promise.all(field.options.map(async (option) => Translator(targetLanguage, option) ?? "err"))
                : field.options;
                
              return { ...field, label: translatedLabel, options: translatedOptions };
            })
          );
  
          setTranslatedSchema(translatedSchema);
        } catch (error) {
          console.error("Error loading or translating form schema:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchAndTranslateSchema();
    }, [targetLanguage]);
    
    if (loading) {
      return <p>Loading form...</p>;
    }
  
    return <FormGenerator formSchema={translatedSchema} targetLanguage={targetLanguage}/>;
  };
  
  export default TranslateForm;