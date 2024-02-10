import { useState } from 'react';
import { DataEco2CV } from '../../data/eco2cv';

const TextAreaEducation = ({ setEducationFields }) => {
  const [education, setEducation] = useState({
    degree: '',
    institution: '',
    startDate: '',
    endDate: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEducation((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddEducation = () => {
    setEducationFields((prevFields) => [...prevFields, education]);
    setEducation({
      degree: '',
      institution: '',
      startDate: '',
      endDate: '',
      city: ''
    });
  };

  return (
    <div className="w-full">
      <h1 className="text-xl font-bold"> {DataEco2CV.EducationBackground} </h1>
      <input
        type="text"
        name="degree"
        value={education.degree ? education.degree : ''}
        onChange={handleInputChange}
        placeholder={DataEco2CV.Degree}
        className="w-full mb-2 p-2 border rounded dark:bg-[#21c284] dark:text-zinc-900"
      />
      <input
        type="text"
        name="institution"
        value={education.institution ? education.institution : ''}
        onChange={handleInputChange}
        placeholder={DataEco2CV.Institution}
        className="w-full mb-2 p-2 border rounded dark:bg-[#21c284] dark:text-zinc-900"
      />
      <input
        type="text"
        name="startDate"
        value={education.startDate ? education.startDate : ''}
        onChange={handleInputChange}
        placeholder={DataEco2CV.StartDate}
        className="w-full mb-2 p-2 border rounded dark:bg-[#21c284] dark:text-zinc-900"
      />
      <input
        type="text"
        name="endDate"
        value={education.endDate ? education.endDate : ''}
        onChange={handleInputChange}
        placeholder={DataEco2CV.EndDate}
        className="w-full mb-2 p-2 border rounded dark:bg-[#21c284] dark:text-zinc-900"
      />
      <input
        type="text"
        name="city"
        value={education.city ? education.city : ''}
        onChange={handleInputChange}
        placeholder={DataEco2CV.City}
        className="w-full mb-2 p-2 border rounded dark:bg-[#21c284] dark:text-zinc-900"
      />
      <button
        onClick={handleAddEducation}
        disabled={
          !education.degree ||
          !education.institution ||
          !education.startDate ||
          !education.endDate ||
          !education.city
        }
        className="gap-x-1.5 rounded-md px-3 py-2 mb-2 text-sm font-semibold bg-indigo-600 text-white ring-1 ring-inset ring-gray-30"
      >
        {DataEco2CV.AddEducation}
      </button>
    </div>
  );
};

export default TextAreaEducation;
