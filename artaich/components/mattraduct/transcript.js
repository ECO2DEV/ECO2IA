import { useContext, useState, useEffect } from 'react';
import { MicrophoneOpen, StopCircleIcon } from '../icons/icons';
import SpeechRecognition, {
  useSpeechRecognition
} from 'react-speech-recognition';
import { PromptContext } from '../../context/prompts/PromptContext';

const Transcription = () => {
  const { setPrompt } = useContext(PromptContext);
  const [isListening, setIsListening] = useState(false);

  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  useEffect(() => {
    if (transcript !== '') {
      setPrompt(transcript);
    }
  }, [transcript]);

  const startListening = () => {
    setIsListening(true);
    SpeechRecognition.startListening({ continuous: true, language: 'fr-FR' });
  };

  const stopListening = () => {
    setIsListening(false);
    SpeechRecognition.stopListening();
    resetTranscript();
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="flex gap-4">
      <button
        onClick={isListening ? stopListening : startListening}
        className="p-2"
      >
        {isListening ? <StopCircleIcon /> : <MicrophoneOpen />}
      </button>
    </div>
  );
};

export default Transcription;
