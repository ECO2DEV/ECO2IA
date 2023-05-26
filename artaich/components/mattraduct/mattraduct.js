import { useEffect, useContext, useState } from 'react';
import { UserContext } from '../../context/user/UserContext';
import { useDebounce } from '../../hooks/useDebounce';
import { MattraductResponse } from '../../util/api/mattraductResponse';
import { LanguageSelector } from './LanguageSelector';
import { TextArea } from './TextArea';
import { useLangStorage } from '../../hooks/useLangStorage';
import OptionsMattraduct from './optionsMattraduct';
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
    fromText,
    setFromText,
    result,
    setResult,
    secondResult,
    setSecondResult,
    loading
  } = useLangStorage();

  const debouncedFromText = useDebounce(fromText, 500);

  const handleClipboardOne = () => {
    navigator.clipboard.writeText(result).catch(() => {});
  };
  const handleClipboardTwo = () => {
    navigator.clipboard.writeText(secondResult).catch(() => {});
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
          <TextArea type={'from'} value={fromText} onChange={setFromText} />

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
      />
    </section>
  );
};

export default MattraductAI;
