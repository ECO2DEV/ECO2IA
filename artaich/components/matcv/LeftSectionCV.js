import { TextAreaProfile } from './TextAreaProfile';
import { TextAreaExperience } from './TextAreaExperience';
import { FormCV } from './FormCV';
import TextAreaEducation from './TextAreaEducation';
import ToggleProfileOpt from './ToggleProfileOpt';
import { DataMattCV } from '../../data/mattcv';

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
      <div className="text-left">
        <h1 className="text-3xl  font-bold mb-8">
          Matt CV
        </h1>
      </div>
      <h1 className="text-xl font-bold"> {DataMattCV.PersonalDetails} </h1>
      <p className="text-xs">
        {DataMattCV.PersonalDetailsText}
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
