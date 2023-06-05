import { useContext, useState } from 'react';
import { UserContext } from '../../context/user/UserContext';
import { MattraductResponse } from '../../util/api/mattraductResponse';
import { Toaster, toast } from 'react-hot-toast';
import { LanguageSelector } from './LanguageSelector';
import { TextArea } from './TextArea';
import { useLangStorage } from '../../hooks/useLangStorage';
import OptionsMattraduct from './optionsMattraduct';
import { PromptContext } from '../../context/prompts/PromptContext';
import { useMattraduct } from '../../hooks/useMattraduct';
import HistoryRequest from './HistoryRequest';

const MattraductAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showThirdTextarea, setShowThirdTextarea] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const { user } = useContext(UserContext);
  const { data: translationsData, mutate } = useMattraduct(user?.id);
  const { setResponse, setPrompt, prompt } = useContext(PromptContext);
  const {
    fromLanguage,
    toLanguage,
    toThirdLanguage,
    setFromLanguage,
    setToThirdLanguage,
    setToLanguage,
    fromText,
    setFromText,
    result,
    setResult,
    secondResult,
    setSecondResult,
    loading
  } = useLangStorage();

  const handleClipboardOne = () => {
    navigator.clipboard
      .writeText(result)
      .then(() => {
        result.length > 0
          ? toast.success('Text copied to clipboard!')
          : toast.error('No text to copy!');
      })
      .catch(() => {
        toast.error('Failed to copy text to clipboard!');
      });
  };

  const handleClipboardTwo = () => {
    navigator.clipboard
      .writeText(secondResult)
      .then(() => {
        result.length > 0
          ? toast.success('Text copied to clipboard!')
          : toast.error('No text to copy!');
      })
      .catch(() => {
        toast.error('Failed to copy text to clipboard!');
      });
  };
  const handleMatTraduct = () => {
    if (!prompt) return;
    setIsLoading(true);
    MattraductResponse({
      prompt: prompt,
      user,
      fromLanguage,
      toLanguage,
      toThirdLanguage
    })
      .then((result) => {
        if (result == null) return;
        // console.log('result.data ', result.data);
        setResult(result?.data?.data.lang1);
        setSecondResult(result?.data?.data.lang2);
        // mutate
        mutate({
          translationsData: [...translationsData.data, result?.data?.data],
          ...translationsData
        });
        setResponse(result?.data?.data.lang1 + result?.data?.data.lang2);
      })
      .catch(() => {
        setResult('Error');
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
  return (
    <>
      <section className="flex flex-col justify-center items-center gap-6 min-h-screen ">
        <div className="w-full max-w-5xl bg-white shadow-lg rounded-md">
          <div className="flex items-center justify-around bg-indigo-600 text-gray-100 px-4 py-2 rounded-t-md">
            <LanguageSelector
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
              value={prompt ? prompt : ''}
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
            />

            {showThirdTextarea && (
              <TextArea
                loading={loading}
                type="to"
                value={secondResult}
                onChange={setSecondResult}
                onClick={handleClipboardTwo}
              />
            )}
          </div>
        </div>

        <OptionsMattraduct
          handleShowThirdTextarea={handleShowThirdTextarea}
          showThirdTextarea={showThirdTextarea}
          onClick={handleModalHistory}
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
      <Toaster position="top-center" />
    </>
  );
};

export default MattraductAI;
