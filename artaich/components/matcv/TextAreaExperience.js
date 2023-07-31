import { useState } from 'react';
import Dropdown from './Dropdown';
import { DataMattCV } from '../../data/mattcv';

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
      <h2 className="text-xl font-bold"> {DataMattCV.WorkExperience} </h2>
      <p className="text-xs mb-2 text-justify">
        {DataMattCV.WorkExperienceText}
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
