import { useState } from 'react';
import { DataMattCV } from '../../data/mattcv';
const proficiencyLevels = [DataMattCV.Begginer, DataMattCV.Intermediate, DataMattCV.Advanced, DataMattCV.Expert];

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
      <h1 className="text-xl font-bold my-4 ">{DataMattCV.SpokenLanguages}</h1>
      <input
        type="text"
        name="name"
        value={language.name ? language.name : ''}
        onChange={handleInputChange}
        placeholder="Language Name"
        className="w-full mb-2 p-2 border rounded"
      />
      <select
        name="proficiency"
        value={language.proficiency ? language.proficiency : ''}
        onChange={handleInputChange}
        className="w-full mb-2 p-2 border rounded"
      >
        <option value="">{DataMattCV.SelectProficiency}</option>
        {proficiencyLevels.map((level, index) => (
          <option key={index} value={level}>
            {level}
          </option>
        ))}
      </select>
      <button
        onClick={handleAddLanguage}
        disabled={!language.name || !language.proficiency}
        className="gap-x-1.5 rounded-md px-3 py-2 mb-6 text-sm font-semibold bg-indigo-600 text-white ring-1 ring-inset ring-gray-30"
      >
        {DataMattCV.AddLanguage}
      </button>
    </section>
  );
};

export default SpokenLanguagesForm;
