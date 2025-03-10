import React, { useState, useRef } from 'react';

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    // Reset audio chunks
    audioChunksRef.current = [];
    
    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Create new media recorder instance
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      // Event handler for when data is available
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      // Event handler for when recording stops
      mediaRecorder.onstop = () => {
        // Combine chunks into a single blob
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        
        // Create URL for the audio blob
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
      };
      
      // Start recording
      mediaRecorder.start();
      setIsRecording(true);
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    // Only stop if we are recording
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Stop all audio tracks
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  return (
    <div className="audio-recorder">
      <h2>Audio Recorder</h2>
      
      <div className="controls">
        {!isRecording ? (
          <button 
            onClick={startRecording} 
            className="record-button"
          >
            Start Recording
          </button>
        ) : (
          <button 
            onClick={stopRecording}
            className="stop-button"
          >
            Stop Recording
          </button>
        )}
      </div>
      
      {audioURL && (
        <div className="audio-playback">
          <h3>Recording Preview:</h3>
          <audio src={audioURL} controls />
          <p>
            <a href={audioURL} download="recording.wav">
              Download Recording
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;