import { useEffect, useContext, useState } from 'react';
import { UserContext } from '../../context/user/UserContext';
import { useDebounce } from '../../hooks/useDebounce';
import { MattraductResponse } from '../../util/api/mattraductResponse';
import { LanguageSelector } from './LanguageSelector';
import { TextArea } from './TextArea';
import { useLangStorage } from '../../hooks/useLangStorage';
import { ArrowsIcon, ClipboardIcon } from '../icons/icons';
import { Dropdownmenu } from './dropdownmenu';
const MattraductAI = () => {
  const [showThirdTextarea, setShowThirdTextarea] = useState(false);

  const { user } = useContext(UserContext);
  const {
    fromLanguage,
    toLanguage,
    toThirdLanguage,
    setFromLanguage,
    setToThirdLanguage,
    setToLanguage,
    interchangeLanguages,
    fromText,
    setFromText,
    result,
    setResult,
    secondResult,
    setSecondResult,
    loading
  } = useLangStorage();

  const debouncedFromText = useDebounce(fromText, 500);

  const handleClipboard = () => {
    navigator.clipboard.writeText(result).catch(() => {});
  };

  const handleShowThirdTextarea = () => {
    setShowThirdTextarea((prev) => !prev);
  };

  useEffect(() => {
    if (debouncedFromText === '') return;

    MattraductResponse({
      prompt: debouncedFromText,
      user,
      fromLanguage,
      toLanguage,
      toThirdLanguage
    })
      .then((result) => {
        if (result == null) return;
        console.log('result.data.lang1 is:', result.data);
        setResult(result?.data?.data.lang1);
        setSecondResult(result?.data?.data.lang2);
      })
      .catch(() => {
        setResult('Error');
      });
  }, [debouncedFromText, fromLanguage, toLanguage, toThirdLanguage]);
  return (
    <section className="flex justify-center items-center min-h-screen ">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-md">
        <div className="flex items-center justify-between bg-indigo-600 text-gray-100 px-4 py-2 rounded-t-md">
          <LanguageSelector
            onChange={setFromLanguage}
            type={'from'}
            value={fromLanguage}
          />
          {/* <button
            disabled={fromLanguage === 'auto'}
            onClick={interchangeLanguages}
          >
            <ArrowsIcon />
          </button> */}
          <LanguageSelector
            onChange={setToLanguage}
            type={'to'}
            value={toLanguage}
          />
          {showThirdTextarea && (
            <LanguageSelector
              onChange={setToThirdLanguage}
              type={'to'}
              value={toThirdLanguage}
            />
          )}
        </div>
        <div className="flex gap-1 flex-col sm:flex-row relative">
          <TextArea type={'from'} value={fromText} onChange={setFromText} />

          <TextArea
            loading={loading}
            type={'to'}
            value={result}
            onChange={setResult}
          />
          {/* <button className="absolute bottom-2 right-64 focus:outline-none">
            <ClipboardIcon />
          </button> */}
          {showThirdTextarea && (
            <TextArea
              loading={loading}
              type={'to'}
              value={secondResult}
              onChange={setSecondResult}
            />
          )}

          {/* <button className="absolute bottom-2 right-2 focus:outline-none">
            <ClipboardIcon />
          </button> */}
        </div>
      </div>
      <Dropdownmenu
        handleShowThirdTextarea={handleShowThirdTextarea}
        showThirdTextarea={showThirdTextarea}
      />
    </section>
  );
};

export default MattraductAI;
