import { useState } from 'react';
import Dropdown from './Dropdown';
import { DataMattCV } from '../../data/mattcv';
import { toast } from 'react-hot-toast';

export const TextAreaExperience = ({
  setWorkExperienceFields,
  setTextExperience,
  textExperience
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formExperienceFields, setFormExperienceFields] = useState({
    jobTitleXp: '',
    employer: '',
    startDate: '',
    endDate: '',
    cityXp: '',
    presentWorking: false
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormExperienceFields((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  function handleAddExperience() {
    setWorkExperienceFields((prevFields) => [
      ...prevFields,
      formExperienceFields
    ]);
    // Clear form fields
    setFormExperienceFields({
      jobTitleXp: '',
      employer: '',
      startDate: '',
      endDate: '',
      cityXp: '',
      presentWorking: false
    });
  }

  return (
    <>
      <h2 className="text-xl font-bold"> {DataMattCV.WorkExperience} </h2>
      <p className="text-xs mb-2 text-justify">
        {DataMattCV.WorkExperienceText}
      </p>
      <Dropdown
        formExperienceFields={formExperienceFields}
        textExperience={textExperience}
        setTextExperience={setTextExperience}
        handleAddExperience={handleAddExperience}
        handleInputChange={handleInputChange}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
    </>
  );
};
