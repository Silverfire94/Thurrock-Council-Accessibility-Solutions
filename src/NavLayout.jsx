import { useState, useEffect } from "react";
import { Select, Space, Container, AppShell, Grid, NavLink, Image, Group, Text, Anchor } from "@mantine/core";
import TranslateForm from "./TranslateForm";
import logo from "./assets/logo.png"
import RenderDocument from "./RenderDocument";
import form1 from "./forms/form1.json"
import form2 from "./forms/form2.json"
import form3 from "./forms/form3.json"

const NavLayout = () => {
    const languageOptions = [
        { value: "af", label: "Afrikaans" },
        { value: "sq", label: "Albanian" },
        { value: "am", label: "Amharic" },
        { value: "ar", label: "Arabic" },
        { value: "hy", label: "Armenian" },
        { value: "az", label: "Azerbaijani" },
        { value: "bn", label: "Bengali" },
        { value: "bs", label: "Bosnian" },
        { value: "bg", label: "Bulgarian" },
        { value: "ca", label: "Catalan" },
        { value: "zh", label: "Chinese (Simplified)" },
        { value: "zh-TW", label: "Chinese (Traditional)" },
        { value: "hr", label: "Croatian" },
        { value: "cs", label: "Czech" },
        { value: "da", label: "Danish" },
        { value: "fa-AF", label: "Dari" },
        { value: "nl", label: "Dutch" },
        { value: "en", label: "English" },
        { value: "et", label: "Estonian" },
        { value: "fa", label: "Farsi (Persian)" },
        { value: "tl", label: "Filipino, Tagalog" },
        { value: "fi", label: "Finnish" },
        { value: "fr", label: "French" },
        { value: "fr-CA", label: "French (Canada)" },
        { value: "ka", label: "Georgian" },
        { value: "de", label: "German" },
        { value: "el", label: "Greek" },
        { value: "gu", label: "Gujarati" },
        { value: "ht", label: "Haitian Creole" },
        { value: "ha", label: "Hausa" },
        { value: "he", label: "Hebrew" },
        { value: "hi", label: "Hindi" },
        { value: "hu", label: "Hungarian" },
        { value: "is", label: "Icelandic" },
        { value: "id", label: "Indonesian" },
        { value: "ga", label: "Irish" },
        { value: "it", label: "Italian" },
        { value: "ja", label: "Japanese" },
        { value: "kn", label: "Kannada" },
        { value: "kk", label: "Kazakh" },
        { value: "ko", label: "Korean" },
        { value: "lv", label: "Latvian" },
        { value: "lt", label: "Lithuanian" },
        { value: "mk", label: "Macedonian" },
        { value: "ms", label: "Malay" },
        { value: "ml", label: "Malayalam" },
        { value: "mt", label: "Maltese" },
        { value: "mr", label: "Marathi" },
        { value: "mn", label: "Mongolian" },
        { value: "no", label: "Norwegian (BokmÃ¥l)" },
        { value: "ps", label: "Pashto" },
        { value: "pl", label: "Polish" },
        { value: "pt", label: "Portuguese (Brazil)" },
        { value: "pt-PT", label: "Portuguese (Portugal)" },
        { value: "pa", label: "Punjabi" },
        { value: "ro", label: "Romanian" },
        { value: "ru", label: "Russian" },
        { value: "sr", label: "Serbian" },
        { value: "si", label: "Sinhala" },
        { value: "sk", label: "Slovak" },
        { value: "sl", label: "Slovenian" },
        { value: "so", label: "Somali" },
        { value: "es", label: "Spanish" },
        { value: "es-MX", label: "Spanish (Mexico)" },
        { value: "sw", label: "Swahili" },
        { value: "sv", label: "Swedish" },
        { value: "ta", label: "Tamil" },
        { value: "te", label: "Telugu" },
        { value: "th", label: "Thai" },
        { value: "tr", label: "Turkish" },
        { value: "uk", label: "Ukrainian" },
        { value: "ur", label: "Urdu" },
        { value: "uz", label: "Uzbek" },
        { value: "vi", label: "Vietnamese" },
        { value: "cy", label: "Welsh" },
    ]
    
    const [selectedPage, setSelectedPage] = useState("forms") // Current page loaded

    const [selectedForm, setSelectedForm] = useState("form1") // Current form selected from navbar
    const [selectedDoc, setSelectedDoc] = useState("doc1") // Current document selected from navbar

    const [change, setChange] = useState(0)

    const [targetLanguage, setTargetLanguage] = useState("en")

    const [formSchema, setFormSchema] = useState(form1)
    const [docText, setDocText] = useState(null)

    const [loading, setLoading] = useState(false)

    const handleFormChange = (formName) => {
        setSelectedForm(formName)
        // setFormSchema(() => (formName === "form1" ? form1 : form2))
        setFormSchema(() => {
            switch(formName) {
                case "form1":
                    return form1
                case "form2":
                    return form2
                case "form3":
                    return form3
                default:
                    return form1
            }
        })
    }

    useEffect(() => {
        const fetchDocument = async () => {
            setLoading(true)
            try {
                const response = await fetch(`/${selectedDoc}.txt`)
                const text = await response.text()
                setDocText(text)
            } catch(error) {
                console.error("Error loading document:", error)
                setDocText(null)
            }
            setLoading(false)
        }

        fetchDocument()
        setChange(change + 1)
    }, [selectedDoc])

    useEffect(() => {
        setChange(change + 1)
    }, [selectedPage, selectedForm])


    return (
        <AppShell header={{ height: 60 }} navbar={{width: 200, breakpoint: "sm"}} padding="xl">

            <AppShell.Header>
                <Group h="100%" px="md">
                    <Image src={logo} alt="Logo" h={30} w="auto" fit="contain" />
                    <Text c="white" size="xl">thurrock.gov.uk</Text>
                    <Space />
                    <Anchor c="white" onClick={() => setSelectedPage("forms")} style={{ fontWeight: selectedPage==="forms" ? "bold" : "normal" }}>Forms</Anchor>
                    <Anchor c="white" onClick={() => setSelectedPage("docs")} style={{ fontWeight: selectedPage==="docs" ? "bold" : "normal" }}>Documents</Anchor>
                </Group>
            </AppShell.Header>

            <AppShell.Navbar p="md">
                {selectedPage==="forms" && 
                    <>
                        <NavLink key="1" active={ selectedForm === "form1" } label="Form 1" onClick={() => handleFormChange("form1")} color="#3b943b" />
                        <NavLink key="2" active={ selectedForm === "form2" } label="Form 2" onClick={() => handleFormChange("form2")} color="#3b943b" />
                        <NavLink key="3" active={ selectedForm === "form3" } label="Form 3" onClick={() => handleFormChange("form3")} color="#3b943b" />
                    </>
                }
                {selectedPage==="docs" &&
                    <>
                        <NavLink key="1" active={ selectedDoc === "doc1" } label="Doc 1" onClick={() => setSelectedDoc("doc1")} color="#3b943b" />
                        <NavLink key="2" active={ selectedDoc === "doc2" } label="Doc 2" onClick={() => setSelectedDoc("doc2")} color="#3b943b" />
                        <NavLink key="3" active={ selectedDoc === "doc3" } label="Doc 3" onClick={() => setSelectedDoc("doc3")} color="#3b943b" />
                    </>
                }
            </AppShell.Navbar>

            <AppShell.Main>
                <Grid>
                    <Grid.Col span={3}>
                        <Select
                            label="Select Language"
                            data={languageOptions}
                            value={targetLanguage}
                            onChange={setTargetLanguage}
                            allowDeselect = {false}
                        />
                    </Grid.Col>
                    <Grid.Col span={9}></Grid.Col>
                    <Grid.Col span={12}>
                        <Container size="sm" pt={20} pb={60}>
                            {selectedPage==="forms" && formSchema && !loading && <TranslateForm key={selectedForm} formSchema={formSchema} targetLanguage={targetLanguage} />}
                            {selectedPage==="docs" && selectedDoc && !loading && <RenderDocument key={selectedDoc} text={docText} targetLanguage={targetLanguage} change={change}/>}
                        </Container>
                    </Grid.Col>
                </Grid>
            </AppShell.Main>

        </AppShell>
    )
}

export default NavLayout