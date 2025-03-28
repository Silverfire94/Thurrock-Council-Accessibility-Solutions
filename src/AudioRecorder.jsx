import React, { useState, useRef } from 'react';
import { Translator } from './Translator';
import { ActionIcon } from '@mantine/core';
import { IconMicrophone, IconPlayerStop, IconCloudUpload } from '@tabler/icons-react';

const API_GATEWAY_URL = "https://exrezmrbw1.execute-api.eu-west-2.amazonaws.com/stt";
const languageToAWSTranscribeMapping = {
  "af": "",
  "sq": "",
  "am": "",
  "ar": "ar-SA",
  "hy": "",
  "az": "",
  "bn": "",
  "bs": "",
  "bg": "",
  "ca": "",
  "zh": "zh-CN",
  "zh-TW": "zh-TW",
  "hr": "",
  "cs": "",
  "da": "da-DK",
  "fa-AF": "",
  "nl": "nl-NL",
  "en": "en-US",
  "et": "",
  "fa": "fa-IR",
  "tl": "",
  "fi": "",
  "fr": "fr-FR",
  "fr-CA": "fr-CA",
  "ka": "",
  "de": "de-DE",
  "el": "",
  "gu": "",
  "ht": "",
  "ha": "",
  "he": "he-IL",
  "hi": "hi-IN",
  "hu": "",
  "is": "",
  "id": "id-ID",
  "ga": "",
  "it": "it-IT",
  "ja": "ja-JP",
  "kn": "",
  "kk": "",
  "ko": "ko-KR",
  "lv": "",
  "lt": "",
  "mk": "",
  "ms": "ms-MY",
  "ml": "",
  "mt": "",
  "mr": "",
  "mn": "",
  "no": "",
  "ps": "",
  "pl": "",
  "pt": "pt-BR",
  "pt-PT": "pt-PT",
  "pa": "",
  "ro": "",
  "ru": "ru-RU",
  "sr": "",
  "si": "",
  "sk": "",
  "sl": "",
  "so": "",
  "es": "es-ES",
  "es-MX": "es-US",
  "sw": "",
  "sv": "sv-SE",
  "ta": "ta-IN",
  "te": "te-IN",
  "th": "th-TH",
  "tr": "tr-TR",
  "uk": "",
  "ur": "",
  "uz": "",
  "vi": "vi-VN",
  "cy": "en-WL",
};

export const CheckCompatibility = ({lang}) => {
  const [message, setMessage] = useState("");
  if (languageToAWSTranscribeMapping[lang] !== "") {
    return;
  }
  const err = async () =>{
    let baba = await Translator(lang, "Sorry this is not supported") ?? "err"
    setMessage(baba)
  }
  err()
  return (
    <p>{message}</p>
  )
}

const AudioRecorder = ({targetLanguage, whenResultReady, size="input-sm" }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioBlobRef = useRef(null);
  const [sttResult, setResult] = useState("null");
        
  const sleep = ms => new Promise(r => setTimeout(r, ms));  


  const startRecording = async () => {

   
    
    audioChunksRef.current = [];
    setAudioURL('');
    setUploadStatus('');

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        audioBlobRef.current = audioBlob;
        setAudioURL(URL.createObjectURL(audioBlob));
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };
  // code snippet taken and modified from https://www.reddit.com/r/npm/comments/1f9r5h6/npm_library_for_recording_audio_both_webmobile/
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleUpload = async () => {
    if (!audioBlobRef.current) {
      setUploadStatus("No recording available to upload");
      return;
    }

    setIsUploading(true);
    setUploadStatus("Preparing upload...");

    try {
      const fileName = `recording-${Date.now()}.wav`;
  
      const response = await fetch(API_GATEWAY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName:fileName, operation: "upload" }),
      });

      if (!response.ok) throw new Error("Failed to get upload URL");



      const { uploadURL } = await response.json();

  
      const s3UploadResponse = await fetch(uploadURL, {
        method: "PUT",
        body: audioBlobRef.current,
        headers: { "Content-Type": "audio/wav" },
      });

      if (!s3UploadResponse.ok) throw new Error("Upload to S3 failed");



      const transcribeResponse = await fetch(API_GATEWAY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName:fileName, operation: "transcribe", lang: "es-ES" }),
      });

      const { jobName } = await transcribeResponse.json();

  

      let code = 202;

      while (code === 202) {
        await sleep(500)
        const getTranscriptResponse = await fetch(API_GATEWAY_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fileName:jobName, operation: "getTranscript" }),
        });

        const { transcriptText } = await getTranscriptResponse.json();

    

        code = getTranscriptResponse.status;
      }

      const getTranscriptResponse = await fetch(API_GATEWAY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName:jobName, operation: "getTranscript" }),
      });


      const transcriptText = await getTranscriptResponse.json();
     

      setResult(transcriptText.transcript)

      if (whenResultReady) {
        whenResultReady(transcriptText.transcript);
      }

      setUploadStatus("Upload successful!");
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus(`Upload failed: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };




  if (languageToAWSTranscribeMapping[targetLanguage] !== "") {
    return (
      <>  
        {!isRecording ? (
          <ActionIcon size={size} color="#3b943b" variant="subtle" onClick={startRecording} className="record-button" disabled={isUploading}>
            <IconMicrophone stroke={1.5} />
          </ActionIcon>
        ) : (
          <ActionIcon size={size} color="#3b943b" variant="subtle" onClick={stopRecording} className="stop-button">
            <IconPlayerStop stroke={1.5} />
          </ActionIcon>
        )}

        {audioURL && (

          <ActionIcon size={size} color="#3b943b" variant='subtle' onClick={handleUpload} loading={isUploading || !audioURL} className="upload-button">
            <IconCloudUpload stroke={1.5} />
          </ActionIcon>
        )}
      </>
    );
  }
  else {
   
    return (
      <ActionIcon size={size} color="#3b943b" variant="subtle" data-disabled onClick={startRecording} className="record-button" disabled={isUploading}>
        <IconMicrophone stroke={1.5} />
      </ActionIcon>
    )
        
  }
 
};

export default AudioRecorder
