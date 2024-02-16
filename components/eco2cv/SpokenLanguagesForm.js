import { useState } from 'react';
import { DataEco2CV } from '../../data/eco2cv';
const proficiencyLevels = [DataEco2CV.Begginer, DataEco2CV.Intermediate, DataEco2CV.Advanced, DataEco2CV.Expert];

const SpokenLanguagesForm = ({ setSpokenLanguages }) => {
  const [language, setLanguage] = useState({
    name: '',
    proficiency: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLanguage((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddLanguage = () => {
    setSpokenLanguages((prevLanguages) => [...prevLanguages, language]);
    setLanguage({
      name: '',
      proficiency: ''
    });
  };

  return (
    <section className="w-full ">
      <h1 className="text-xl font-bold my-4 text-primary">{DataEco2CV.SpokenLanguages}</h1>
      <input
        type="text"
        name="name"
        value={language.name ? language.name : ''}
        onChange={handleInputChange}
        placeholder="Language Name"
        className="w-full mb-2 p-2 border rounded dark:text-black"
      />
      <select
        name="proficiency"
        value={language.proficiency ? language.proficiency : ''}
        onChange={handleInputChange}
        className="w-full mb-2 p-2 border rounded dark:text-black"
      >
        <option value="">{DataEco2CV.SelectProficiency}</option>
        {proficiencyLevels.map((level, index) => (
          <option key={index} value={level}>
            {level}
          </option>
        ))}
      </select>
      <button
        onClick={handleAddLanguage}
        disabled={!language.name || !language.proficiency}
        className="gap-x-1.5 rounded-md px-3 py-2 mb-6 text-sm font-semibold bg-primary text-white ring-1 ring-inset ring-gray-30"
      >
        {DataEco2CV.AddLanguage}
      </button>
    </section>
  );
};

export default SpokenLanguagesForm;
