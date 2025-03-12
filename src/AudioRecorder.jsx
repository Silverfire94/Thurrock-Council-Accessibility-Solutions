import React, { useState, useRef } from 'react';
import { Translator } from './Translator';
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

const AudioRecorder = ({targetLanguage, whenResultReady }) => {
  console.log(targetLanguage)
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

    // if (languageToAWSTranscribeMapping[targetLanguage] === "")
    //   return;
    // }
    
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
  

      // ✅ Step 1: Request Pre-signed URL from API Gateway
      const response = await fetch(API_GATEWAY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName:fileName, operation: "upload" }),
      });

      if (!response.ok) throw new Error("Failed to get upload URL");



      const { uploadURL } = await response.json();

      // ✅ Step 2: Upload to S3 using the pre-signed URL
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

      console.log(transcriptText.transcript)
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
    <div className="audio-recorder">
      <h2>Audio Recorder</h2>

      <div className="controls">
        {!isRecording ? (
          <button onClick={startRecording} className="record-button" disabled={isUploading}>
            Start Recording
          </button>
        ) : (
          <button onClick={stopRecording} className="stop-button">
            Stop Recording
          </button>
        )}
      </div>

      {audioURL && (
        <div className="audio-playback">
          <h3>Recording Preview:</h3>
          <audio src={audioURL} controls />

          <div className="actions">
            {/* <p>
              <a href={audioURL} download="recording.wav">
                Download Recording
              </a>
            </p> */}

            <button onClick={handleUpload} disabled={isUploading || !audioURL} className="upload-button">
              {isUploading ? 'Uploading...' : 'Upload to Cloud'}
            </button>

            {uploadStatus && <p className="status-message">{uploadStatus}</p>}
          </div>
        </div>
      )}
    </div>
  );
  }
  else {
    const err = async () =>{
      let baba = await Translator(targetLanguage, "Sorry this is not supported") ?? "err"
      setErrorMessage(baba)
      console.log("error message: ", errorMessage)
    }
    err()
    return <div>
      <p>{errorMessage}</p>
        
        
    
    </div>
  }
 
};

export default AudioRecorder;
