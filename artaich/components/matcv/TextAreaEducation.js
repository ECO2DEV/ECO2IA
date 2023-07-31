import React, { useState } from 'react';
import { DataMattCV } from '../../data/mattcv';
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
      <h1 className="text-xl font-bold"> {DataMattCV.EducationBackground} </h1>
      <input
        type="text"
        name="degree"
        value={education.degree ? education.degree : ''}
        onChange={handleInputChange}
        placeholder={DataMattCV.Degree}
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        type="text"
        name="institution"
        value={education.institution ? education.institution : ''}
        onChange={handleInputChange}
        placeholder={DataMattCV.Institution}
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        type="text"
        name="startDate"
        value={education.startDate ? education.startDate : ''}
        onChange={handleInputChange}
        placeholder={DataMattCV.StartDate}
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        type="text"
        name="endDate"
        value={education.endDate ? education.endDate : ''}
        onChange={handleInputChange}
        placeholder={DataMattCV.EndDate}
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        type="text"
        name="city"
        value={education.city ? education.city : ''}
        onChange={handleInputChange}
        placeholder={DataMattCV.City}
        className="w-full mb-2 p-2 border rounded"
      />
      <button
        onClick={handleAddEducation}
        className="gap-x-1.5 rounded-md px-3 py-2 mb-2 text-sm font-semibold bg-indigo-600 text-white ring-1 ring-inset ring-gray-30"
      >
        {DataMattCV.AddEducation}
      </button>
    </div>
  );
};

export default TextAreaEducation;
