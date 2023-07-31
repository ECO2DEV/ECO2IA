import { useState } from 'react';
import Dropdown from './Dropdown';

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
  }

  return (
    <>
      <h2 className="text-xl font-bold">Work experience:</h2>
      <p className="text-xs mb-2 text-justify">
        Highlight your professional expertise with concise, achievement-focused
        statements. Incorporate measurable data to demonstrate the impact of
        your actions (e.g., 'Achieved X goal by implementing Z strategy,
        resulting in Y measurable outcome'). Showcase tangible contributions to
        set your work experience apart.
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
