import { useContext, useState, useEffect } from 'react';
import { MicrophoneOpen, StopCircleIcon, MicrophoneBlue } from '../icons/icons';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { PromptContext } from '../../context/prompts/PromptContext';

const Transcription = () => {
  const { setPrompt } = useContext(PromptContext);
  const [isListening, setIsListening] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState('');

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    setCurrentTranscript(transcript);
  }, [transcript]);

  useEffect(() => {
    if (currentTranscript !== '') {
      setPrompt(currentTranscript);
    }
  }, [currentTranscript, setPrompt]);

  const startListening = () => {
    setIsListening(true);
    SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
  };

  const stopListening = () => {
    setIsListening(false);
    SpeechRecognition.stopListening();
    setCurrentTranscript('');
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="flex gap-4">
      <button onClick={isListening ? stopListening : startListening} className="p-2">
        {isListening ? <StopCircleIcon /> : <MicrophoneOpen />}
      </button>
    </div>
  );
};

export default Transcription;
