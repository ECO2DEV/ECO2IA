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
  const [spokenLanguages, setSpokenLanguages] = useState([]);

  const [dropdowns, setDropdowns] = useState([]); // Inicializa con un dropdown cerrado, componente add experience

  const [selectedTemplate, setSelectedTemplate] = useState('template1');

  // debounce for the dropdowns

  const debouncedFormData = useDebounce(formData, 700);
  const debouncedTextProfile = useDebounce(textProfile, 700);

  const [showPreview, setShowPreview] = useState(false);

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };
  const isBisScreen = typeof window !== 'undefined' && window.innerWidth > 1024;

  return (
    <div className="flex flex-col lg:flex-row h-max lg:h-0 gap-2 relative">
      {selectedTemplate === 'template2' ? (
        <>
          {/* Left section Forms - inputs*/}
          <LeftSectionCV
            setSpokenLanguages={setSpokenLanguages}
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

          {showPreview && !isBisScreen && (
            <MobilePopUp isModalNeedIt={true} onClose={togglePreview}>
              <PDFTemplateTwo
                spokenLanguages={spokenLanguages}
                dropdowns={dropdowns}
                debouncedFormData={debouncedFormData}
                debouncedTextProfile={debouncedTextProfile}
                textProfile={textProfile}
                educationFields={educationFields}
                user={user}
              />
            </MobilePopUp>
          )}
          <section className="w-full hidden lg:block md:w-[35%] lg:w-[41%] lg:fixed lg:right-0 h-full dark:bg-darkColor bg-lightColor">
            <PDFTemplateTwo
              spokenLanguages={spokenLanguages}
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
          <section className="w-full hidden lg:block md:w-[35%] lg:w-[41%] lg:fixed lg:right-0 h-full dark:bg-darkColor bg-lightColor">
            {showPreview && !isBisScreen && (
              <MobilePopUp isModalNeedIt={true}>
                <PDFTemplateOne
                  spokenLanguages={spokenLanguages}
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
              spokenLanguages={spokenLanguages}
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
            setSpokenLanguages={setSpokenLanguages}
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
        className="fixed bottom-5 right-4 bg-eco2MainColor text-white px-4 py-2 rounded-md lg:hidden"
        onClick={togglePreview}
      >
        Avance
      </button>
    </div>
  );
};

export default MyDocument;
