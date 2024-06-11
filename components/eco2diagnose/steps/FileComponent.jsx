import { DropfileDiagnose } from '../DropFileDiagnose';

export const FileComponent = ({ setFormData, formData }) => {
  return (
    <DropfileDiagnose
      setFormData={setFormData}
      formData={formData}

    />
  );
};
