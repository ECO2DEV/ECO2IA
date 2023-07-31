import { TextAreaProfile } from './TextAreaProfile';
import { TextAreaExperience } from './TextAreaExperience';
import { FormCV } from './FormCV';
import TextAreaEducation from './TextAreaEducation';
import ToggleProfileOpt from './ToggleProfileOpt';

export const LeftSectionCV = ({
  formData,
  setFormData,
  textProfile,
  setTextProfile,
  setEducationFields,
  setTextExperience,
  textExperience,
  setWorkExperienceFields
}) => {
  return (
    <section className="md-w-[45%] lg:w-[50%] lg:absolute lg:-left-4">
      <h1 className="text-xl font-bold">Personal details</h1>
      <p className="text-xs">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam quasi
        sint soluta aliquam nam culpa ad similique blanditiis eius voluptatem.
      </p>
      <FormCV formData={formData} setFormData={setFormData} />
      <ToggleProfileOpt setFormData={setFormData} />
      <TextAreaProfile
        textProfile={textProfile}
        setTextProfile={setTextProfile}
      />
      <TextAreaEducation setEducationFields={setEducationFields} />
      <TextAreaExperience
        setTextExperience={setTextExperience}
        textExperience={textExperience}
        setWorkExperienceFields={setWorkExperienceFields}
      />
    </section>
  );
};
