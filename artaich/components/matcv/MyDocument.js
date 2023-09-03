import { useContext, useState } from 'react';
import { UserContext } from '../../context/user/UserContext';

import { useDebounce } from '../../hooks/useDebounce';
import { MobilePopUp } from './MobilePopUp';

import { LeftSectionCV } from './LeftSectionCV';
import { PDFTemplateOne } from './PDFTemplateOne';
import { PDFTemplateTwo } from './PDFTemplateTwo';
// Create styles

// Create Document Component
const MyDocument = ({ formData, setFormData }) => {
  const { user } = useContext(UserContext);

  const [textProfile, setTextProfile] = useState('');
  const [educationFields, setEducationFields] = useState([]);

  const [dropdowns, setDropdowns] = useState([{ isOpen: false }]); // Inicializa con un dropdown cerrado, componente add experience

  const [selectedTemplate, setSelectedTemplate] = useState('template1');

  // debounce for the dropdowns

  const debouncedFormData = useDebounce(formData, 700);
  const debouncedTextProfile = useDebounce(textProfile, 700);

  const [showPreview, setShowPreview] = useState(false);

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };
  return (
    <div className="flex flex-col lg:flex-row h-screen gap-2 relative">
      {selectedTemplate === 'template2' ? (
        <>
          {/* Left section Forms - inputs*/}
          <LeftSectionCV
            dropdowns={dropdowns}
            setDropdowns={setDropdowns}
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
            formData={formData}
            setFormData={setFormData}
            textProfile={textProfile}
            setTextProfile={setTextProfile}
            setEducationFields={setEducationFields}
          />
          {/* Right section PDF viewer*/}

          {showPreview && (
            <MobilePopUp isModalNeedIt={true} onClose={togglePreview}>
              <PDFTemplateTwo
                dropdowns={dropdowns}
                debouncedFormData={debouncedFormData}
                debouncedTextProfile={debouncedTextProfile}
                textProfile={textProfile}
                educationFields={educationFields}
                user={user}
              />
            </MobilePopUp>
          )}
          <section className="w-full hidden lg:block md:w-[35%] lg:w-[41%] lg:fixed lg:right-0 h-full">
            <PDFTemplateTwo
              dropdowns={dropdowns}
              debouncedFormData={debouncedFormData}
              debouncedTextProfile={debouncedTextProfile}
              textProfile={textProfile}
              educationFields={educationFields}
              user={user}
            />
          </section>
        </>
      ) : (
        <>
          <section className="w-full hidden lg:block md:w-[35%] lg:w-[41%] lg:fixed lg:right-0 h-full">
            {showPreview && (
              <MobilePopUp isModalNeedIt={true}>
                <PDFTemplateOne
                  dropdowns={dropdowns}
                  debouncedFormData={debouncedFormData}
                  debouncedTextProfile={debouncedTextProfile}
                  textProfile={textProfile}
                  educationFields={educationFields}
                  user={user}
                />
              </MobilePopUp>
            )}
            <PDFTemplateOne
              dropdowns={dropdowns}
              debouncedFormData={debouncedFormData}
              debouncedTextProfile={debouncedTextProfile}
              textProfile={textProfile}
              educationFields={educationFields}
              user={user}
            />
          </section>
          {/* Left section Forms - inputs*/}
          <LeftSectionCV
            dropdowns={dropdowns}
            setDropdowns={setDropdowns}
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
            formData={formData}
            setFormData={setFormData}
            textProfile={textProfile}
            setTextProfile={setTextProfile}
            setEducationFields={setEducationFields}
          />
        </>
      )}
      {/* Mobile button section */}

      <button
        className="fixed bottom-5 right-4 bg-indigo-500 text-white px-4 py-2 rounded-md lg:hidden"
        onClick={togglePreview}
      >
        Preview
      </button>
    </div>
  );
};

export default MyDocument;
