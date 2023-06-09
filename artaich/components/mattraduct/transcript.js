import React from 'react';
import { MicrophoneIcon, PlusIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Transcription = () => {
    const {
      transcript,
      listening,
      startListening,
      stopListening,
      resetTranscript,
      browserSupportsSpeechRecognition
    } = useSpeechRecognition();
  
    if (!browserSupportsSpeechRecognition) {
      return <span>Browser doesn't support speech recognition.</span>;
    }
  
    return (
        <div>
        <button onClick={SpeechRecognition.startListening}>
            Micon
        </button>
        <button onClick={SpeechRecognition.stopListening}>MicOf</button>
        <button onClick={resetTranscript}>D</button>
        
      </div>
    );
  };
  
  export default Transcription;