import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/user/UserContext";
import { Eco2traductResponse } from "../../util/api/Eco2traductResponse";
import { toast } from "react-hot-toast";
import { LanguageSelector } from "./LanguageSelector";
import { TextArea } from "./TextArea";
import { useLangStorage } from "../../hooks/useLangStorage";
import OptionsMattraduct from "./optionsMattraduct";
import { PromptContext } from "../../context/prompts/PromptContext";
import { useEco2traduct } from "../../hooks/useEco2traduct";
import HistoryRequest from "./HistoryRequest";
import { VOICE_FOR_LANGUAGE } from "../../constants/constans";
import { DataEco2Traduct } from "../../data/eco2traduct";
import { DetectionLanguage } from "./JustDetectionLanguage";

const Eco2traductAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showThirdTextarea, setShowThirdTextarea] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // Se añade la variable isPlaying
  const [translationResponse, setTranslationResponse] = useState("");

  const { user } = useContext(UserContext);
  const { data: translationsData, mutate } = useEco2traduct(user?.id);
  const {
    setResponse,
    setPrompt,
    setPromptTokens,
    prompt,
    activeAI,
    setActiveAI,
  } = useContext(PromptContext);
  const {
    fromLanguage,
    toLanguage,
    toThirdLanguage,
    setFromLanguage,
    setToThirdLanguage,
    setToLanguage,
    setFromText,
    result,
    setResult,
    secondResult,
    setSecondResult,
    loading,
  } = useLangStorage();

  useEffect(() => {
    if (activeAI !== "Eco2traductAI") {
      setPrompt("");
      setPromptTokens(0);
    }
    setActiveAI("Eco2traductAI");
  }, []);

  const handleClipboardOne = () => {
    navigator.clipboard
      .writeText(result)
      .then(() => {
        result.length > 0
          ? toast.success(DataEco2Traduct.CopiedSuccess)
          : toast.error(DataEco2Traduct.NoText);
      })
      .catch(() => {
        toast.error(DataEco2Traduct.CopiedFailed);
      });
  };

  const handleClipboardTwo = () => {
    navigator.clipboard
      .writeText(secondResult)
      .then(() => {
        result.length > 0
          ? toast.success(DataEco2Traduct.CopiedSuccess)
          : toast.error(DataEco2Traduct.NoText);
      })
      .catch(() => {
        toast.error(DataEco2Traduct.CopiedFailed);
      });
  };
  const handleMatTraduct = () => {
    if (!prompt || activeAI !== "Eco2traductAI") return;
    setIsLoading(true);
    Eco2traductResponse({
      prompt: prompt,
      user,
      fromLanguage,
      toLanguage,
      toThirdLanguage,
    })
      .then((result) => {
        if (result == null) return;
        setResult(result?.data?.data.lang1);
        setSecondResult(result?.data?.data.lang2);
        mutate({
          translationsData: [...translationsData.data, result?.data?.data],
          ...translationsData,
        });
        setResponse(result?.data?.data.lang1 + result?.data?.data.lang2);

        // Set the translation response to the state variable
        setTranslationResponse(
          result?.data?.data.lang1 + result?.data?.data.lang2
        );
      })
      .catch(() => {
        setResult("Error");
      })
      .finally(() => {
        setIsLoading(false);
        // setPrompt('');
      });
  };

  const handleShowThirdTextarea = () => {
    setShowThirdTextarea((prev) => !prev);
  };

  const handleModalHistory = () => {
    setModalOpen((prev) => !prev);
  };

  const handlePlayAudio = () => {
    if (!isPlaying) {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance();
        utterance.text = result;
        utterance.lang = VOICE_FOR_LANGUAGE[toLanguage];

        if (result.trim() !== "") {
          window.speechSynthesis.speak(utterance);
          setIsPlaying(true);
        }
      }
    } else {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (isPlaying) {
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
          window.speechSynthesis.cancel();
          setIsPlaying(false);
        }
      }
    };
  }, [isPlaying]);

  const handlePlayAudioTwo = () => {
    if (!isPlaying) {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance();
        utterance.text = secondResult;
        utterance.lang = VOICE_FOR_LANGUAGE[toThirdLanguage];
        if (secondResult.trim() !== "") {
          window.speechSynthesis.speak(utterance);
          setIsPlaying(true);
        }
      }
    } else {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (isPlaying) {
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
          window.speechSynthesis.cancel();
          setIsPlaying(false);
        }
      }
    };
  }, [isPlaying]);

  return (
    <>
      <section className="flex flex-col justify-center items-center gap-6 min-h-screen ">
        {/* <h1 className='text-5xl font-semibold text-eco2MainColor dark:text-white'>María: Tu traductora personal</h1> */}
        <h1 className="text-5xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-eco2MainColor to-darkBgCard dark:from-eco2MainColor dark:to-white">
          María: Tu traductora personal
        </h1>
        <div className="w-full max-w-5xl shadow-lg bg-eco2MainColor rounded-md">
          <div className="flex items-center justify-around text-gray-100 px-4 py-2 rounded-t-md">
            <DetectionLanguage
              onChange={setFromLanguage}
              type="from"
              value={fromLanguage}
            />

            <LanguageSelector
              onChange={setToLanguage}
              type="to"
              value={toLanguage}
            />
            {showThirdTextarea && (
              <LanguageSelector
                onChange={setToThirdLanguage}
                type="to"
                value={toThirdLanguage}
              />
            )}
          </div>
          <div className="flex gap-1 flex-col sm:flex-row ">
            <TextArea
              type="from"
              value={prompt ? prompt : ""}
              onChange={setPrompt}
              onHandleTraduct={handleMatTraduct}
              fetchLoading={isLoading}
            />

            <TextArea
              loading={loading}
              type="to"
              value={result}
              onChange={setResult}
              onClick={handleClipboardOne}
              handlePlayAudio={handlePlayAudio}
            />

            {showThirdTextarea && (
              <TextArea
                loading={loading}
                type="to"
                value={secondResult}
                onChange={setSecondResult}
                onClick={handleClipboardTwo}
                handlePlayAudio={handlePlayAudioTwo}
              />
            )}
          </div>
        </div>

        <OptionsMattraduct
          handleShowThirdTextarea={handleShowThirdTextarea}
          showThirdTextarea={showThirdTextarea}
          onClick={handleModalHistory}
          language={fromLanguage}
          translationResponse={translationResponse}
          prompt={prompt}
        />
      </section>
      {modalOpen && (
        <HistoryRequest
          onClose={handleModalHistory}
          setResult={setResult}
          setSecondResult={setSecondResult}
          setFromText={setFromText}
        />
      )}
    </>
  );
};

export default Eco2traductAI;
