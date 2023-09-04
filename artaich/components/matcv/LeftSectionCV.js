import { useState } from 'react';
import { TextAreaProfile } from './TextAreaProfile';
import { FormCV } from './FormCV';
import TextAreaEducation from './TextAreaEducation';
import ToggleProfileOpt from './ToggleProfileOpt';
import { RadioButtonsTemplate } from './RadioButtonsTemplate';
import { DataMattCV } from '../../data/mattcv';
import ExperienceForm from './ExperienceForm';
import SpokenLanguagesForm from './SpokenLanguagesForm';

export const LeftSectionCV = ({
  setSpokenLanguages,
  formData,
  selectedTemplate,
  setSelectedTemplate,
  setFormData,
  textProfile,
  setTextProfile,
  setEducationFields,
  dropdowns,
  setDropdowns
}) => {
  const [toggleHovered, setToggleHovered] = useState(false);

  const handleToggleHover = (isHovered) => {
    setToggleHovered(isHovered);
  };

  const handleTemplateChange = (event) => {
    setSelectedTemplate(event.target.value);
  };

  return (
    <section className="md-w-[45%] lg:w-[50%] lg:absolute lg:-left-4">
      <h1 className="text-xl font-bold"> {DataMattCV.PersonalDetails} </h1>
      <p className="text-xs">{DataMattCV.PersonalDetailsText}</p>
      <FormCV formData={formData} setFormData={setFormData} />

      <div className="flex justify-start items-center relative">
        <div
          title={DataMattCV.AddProfileInfo}
          onMouseEnter={() => handleToggleHover(true)}
          onMouseLeave={() => handleToggleHover(false)}
        >
          <ToggleProfileOpt setFormData={setFormData} />
        </div>
        {toggleHovered && (
          <p className="absolute top-[-40px] left-0 bg-white p-1 rounded border border-gray-300 shadow">
            {DataMattCV.CompleteInfo}
          </p>
        )}
      </div>
      <TextAreaProfile
        textProfile={textProfile}
        setTextProfile={setTextProfile}
      />
      <TextAreaEducation setEducationFields={setEducationFields} />

      {/* Radio button group for choosing templates */}
      <RadioButtonsTemplate
        handleTemplateChange={handleTemplateChange}
        selectedTemplate={selectedTemplate}
      />
      <ExperienceForm dropdowns={dropdowns} setDropdowns={setDropdowns} />
      <SpokenLanguagesForm setSpokenLanguages={setSpokenLanguages} />
    </section>
  );
};
