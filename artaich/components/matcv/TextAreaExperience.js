import { useState } from 'react';
import Dropdown from './Dropdown';

export const TextAreaExperience = ({
  textExperience,
  setTextExperience,
  formExperienceFields,
  setFormExperienceFields
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  function handleModalOpen() {
    setModalOpen((prev) => !prev);
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
        setFormExperienceFields={setFormExperienceFields}
        textExperience={textExperience}
        setTextExperience={setTextExperience}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        handleModalOpen={handleModalOpen}
      />
    </>
  );
};
