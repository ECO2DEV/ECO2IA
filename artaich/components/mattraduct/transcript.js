import  {useContext} from 'react';
import { MicrophoneOpen, StopCircleIcon, MicrophoneBlue, TrashIconBlack } from '../icons/icons';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useState } from 'react';
import { PromptContext } from '../../context/prompts/PromptContext';

const Transcription = () => {
  const { setPrompt } = useContext(PromptContext);
  const [isListening, setIsListening] = useState(false); 

  const startListening = () => {
    setIsListening(true);
    SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
  };

  const stopListening = () => {
    setIsListening(false);
    SpeechRecognition.stopListening();
    setPrompt(transcript);
  };

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }


  return (
    <div className="flex gap-4">
      <button onClick={startListening} className="p-2">
        {isListening ? <MicrophoneBlue /> : <MicrophoneOpen />}
      </button>
      <button onClick={stopListening} className="p-2">
        <StopCircleIcon />
      </button>
    </div>
  );
};
export default Transcription;