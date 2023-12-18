import { useContext } from 'react';
import { UserContext } from '../../context/user/UserContext';
import { DataMattCV } from '../../data/mattcv';

const LanguageDropdown = () => {
  const languages = [
    'Allemand',
    'Anglais',
    'Espagnol',
    'Français',
    'Italien',
    'Portugais'
  ];
  const { setLanguage, language } = useContext(UserContext);

  const handleChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="w-60 flex items-center gap-2">
      <label
        htmlFor="languageDropdown"
        className=" text-gray-500 text-sm font-bold flex-shrink-0"
      >
        {DataMattCV.SelectedLanguage}
      </label>
      <select
        id="languageDropdown"
        className=" appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        value={language}
        onChange={handleChange}
      >
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageDropdown;
