import { useEffect, useContext } from 'react';
import { UserContext } from '../../context/user/UserContext';
import { useDebounce } from '../../hooks/useDebounce';
import { MattraductResponse } from '../../util/api/mattraductResponse';
import { LanguageSelector } from './LanguageSelector';
import { TextArea } from './TextArea';
import { useLangStorage } from '../../hooks/useLangStorage';
import { ArrowsIcon } from '../icons/icons';
const MattraductAI = () => {
  const { user } = useContext(UserContext);
  const {
    fromLanguage,
    toLanguage,
    setFromLanguage,
    setToLanguage,
    interchangeLanguages,
    fromText,
    setFromText,
    result,
    setResult,
    loading
  } = useLangStorage();

  // const debouncedFromText = useDebounce(fromText, 300);

  // useEffect(() => {
  //   if (debouncedFromText === '') return;

  //   MattraductResponse({
  //     prompt: debouncedFromText,
  //     user,
  //     fromLanguage,
  //     toLanguage
  //   })
  //     .then((result) => {
  //       if (result == null) return;
  //       console.log('result.data.lang1 is:', result.data);
  //       setResult(result?.data?.data.lang1);
  //     })
  //     .catch(() => {
  //       setResult('Error');
  //     });
  // }, [debouncedFromText, fromLanguage, toLanguage]);
  return (
    <section className="flex justify-center items-center min-h-screen ">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-md">
        <div className="flex items-center justify-between bg-indigo-600 px-4 py-2 rounded-t-md">
          <LanguageSelector
            onChange={setFromLanguage}
            type={'from'}
            value={fromLanguage}
          />
          <button
            disabled={fromLanguage === 'auto'}
            onClick={interchangeLanguages}
          >
            <ArrowsIcon />
          </button>
          <LanguageSelector
            onChange={setToLanguage}
            type={'to'}
            value={toLanguage}
          />
        </div>
        <div className="flex gap-1 flex-col sm:flex-row ">
          <TextArea type={'from'} value={fromText} onChange={setFromText} />
          <TextArea
            loading={loading}
            type={'to'}
            value={result}
            onChange={setResult}
          />
          <TextArea
            loading={loading}
            type={'to'}
            value={result}
            onChange={setResult}
          />
        </div>
      </div>
    </section>
  );
};

export default MattraductAI;
