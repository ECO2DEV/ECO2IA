import { useContext, useState, useEffect } from 'react';
import { MicrophoneOpen, StopCircleIcon } from '../icons/icons';
import SpeechRecognition, {
  useSpeechRecognition
} from 'react-speech-recognition';
import { PromptContext } from '../../context/prompts/PromptContext';
import { VOICE_FOR_LANGUAGE } from '../../constants/constans';

const Transcription = ({language}) => {
  
  const { setPrompt } = useContext(PromptContext);
  const [isListening, setIsListening] = useState(false);
 
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  useEffect(() => {
    let timer;
    if (transcript !== '') {
      setPrompt(transcript);
     

      setIsListening(false);
      SpeechRecognition.stopListening();
      resetTranscript();
      
    }
    // else{
    //    timer = setTimeout(() => {
    //     if (transcript ==='') {
    //       setPrompt(transcript);
    //       setIsListening(false);
    //       SpeechRecognition.stopListening();
    //       //resetTranscript();
          
    //     }
    //   }, 5000); // 5000 milliseconds = 5 seconds
  
    //   return () => clearTimeout(timer); // Cleanup the timer on component unmount
    // }
  }, [transcript]);

  const startListening = () => {
    setIsListening(true);
    SpeechRecognition.startListening({ continuous: true, language:  VOICE_FOR_LANGUAGE[language] });
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
