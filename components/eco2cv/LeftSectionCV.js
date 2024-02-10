import { useState } from 'react';
import { TextAreaProfile } from './TextAreaProfile';
import { FormCV } from './FormCV';
import TextAreaEducation from './TextAreaEducation';
import ToggleProfileOpt from './ToggleProfileOpt';
import { RadioButtonsTemplate } from './RadioButtonsTemplate';
import { DataEco2CV } from '../../data/eco2cv';
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
      <h1 className="text-xl font-bold"> {DataEco2CV.PersonalDetails} </h1>
      <p className="text-xs">{DataEco2CV.PersonalDetailsText}</p>
      <FormCV formData={formData} setFormData={setFormData} />

      <div className="flex justify-start items-center relative">
        <div
          title={DataEco2CV.AddProfileInfo}
          onMouseEnter={() => handleToggleHover(true)}
          onMouseLeave={() => handleToggleHover(false)}
        >
          <ToggleProfileOpt setFormData={setFormData} />
        </div>
        {toggleHovered && (
          <p className="absolute top-[-40px] left-0 bg-white p-1 rounded border border-gray-300 shadow">
            {DataEco2CV.CompleteInfo}
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
