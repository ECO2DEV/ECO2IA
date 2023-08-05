import { useState } from 'react';
import { TextAreaProfile } from './TextAreaProfile';
import { TextAreaExperience } from './TextAreaExperience';
import { FormCV } from './FormCV';
import TextAreaEducation from './TextAreaEducation';
import ToggleProfileOpt from './ToggleProfileOpt';
import { RadioButtonsTemplate } from './RadioButtonsTemplate';

export const LeftSectionCV = ({
  formData,
  selectedTemplate,
  setSelectedTemplate,
  setFormData,
  textProfile,
  setTextProfile,
  setEducationFields,
  setTextExperience,
  textExperience,
  setWorkExperienceFields
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
      <h1 className="text-xl font-bold">Personal details</h1>
      <p className="text-xs">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam quasi
        sint soluta aliquam nam culpa ad similique blanditiis eius voluptatem.
      </p>
      <FormCV formData={formData} setFormData={setFormData} />
      <div className="flex justify-start items-center relative">
        <div
          title="Add your profile info"
          onMouseEnter={() => handleToggleHover(true)}
          onMouseLeave={() => handleToggleHover(false)}
        >
          <ToggleProfileOpt setFormData={setFormData} />
        </div>
        {toggleHovered && (
          <p className="absolute top-[-40px] left-0 bg-white p-1 rounded border border-gray-300 shadow">
            Complete with your profile info
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

      <TextAreaExperience
        setTextExperience={setTextExperience}
        textExperience={textExperience}
        setWorkExperienceFields={setWorkExperienceFields}
      />
    </section>
  );
};
