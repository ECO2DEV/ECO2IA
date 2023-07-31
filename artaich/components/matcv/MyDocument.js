import { Fragment, useContext, useState } from 'react';
import { UserContext } from '../../context/user/UserContext';
import dynamic from 'next/dynamic';
import { useDebounce } from '../../hooks/useDebounce';
import { MobilePopUp } from './MobilePopUp';

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image
} from '@react-pdf/renderer';
import { LeftSectionCV } from './LeftSectionCV';
// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
    padding: '10mm'
  },
  firstColumn: {
    flexBasis: '70%',
    marginRight: '10mm'
  },
  secondColumn: {
    flexBasis: '30%'
  },
  heading: {
    fontWeight: 'ultrabold',
    fontSize: '15pt'
  },
  subtitle: {
    fontWeight: 'medium',
    fontSize: '12pt',
    marginBottom: '1mm'
  },
  thirdTitle: {
    fontWeight: 'light',
    fontSize: '10pt',
    marginTop: '2mm',
    marginBottom: '1mm'
  },
  profileText: {
    marginBottom: '5mm',
    fontSize: '10pt',
    textAlign: 'justify',
    fontWeight: 'light',
    color: '#474b4e'
  },
  bulletPoint: {
    fontSize: '10pt',
    textAlign: 'justify',
    fontWeight: 'light',
    color: '#474b4e'
  },
  phoneDetail: {
    marginBottom: '5mm',
    marginTop: '-4mm',
    fontSize: '10pt',
    textAlign: 'justify',
    fontWeight: 'light',
    color: '#474b4e'
  },
  spacing: {
    marginBottom: '5mm'
  },
  pictureContainer: {
    objectFit: 'fill',
    height: '40mm',
    marginBottom: '5mm',
    backgroundColor: '#DDD',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  skillsText: {
    marginBottom: '5mm'
  },
  languagesText: {
    marginBottom: '5mm'
  }
});

const DynamicPDFViewer = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFViewer),
  {
    ssr: false
  }
);
// Create Document Component
const MyDocument = ({ formData, setFormData }) => {
  const { user } = useContext(UserContext);

  const [textProfile, setTextProfile] = useState('');
  const [educationFields, setEducationFields] = useState([]);
  const [workExperienceFields, setWorkExperienceFields] = useState([]);
  const [textExperience, setTextExperience] = useState([]);

  const debouncedFormData = useDebounce(formData, 700);
  const debouncedTextProfile = useDebounce(textProfile, 700);

  const [showPreview, setShowPreview] = useState(false);

  const togglePreview = () => {
    setShowPreview((prev) => !prev);
  };
  // console.log('workexperiencefields', workExperienceFields);

  return (
    <div className="flex flex-col lg:flex-row h-screen gap-2 relative">
      {/* Left section Forms - inputs*/}
      <LeftSectionCV
        formData={formData}
        setFormData={setFormData}
        textProfile={textProfile}
        setTextProfile={setTextProfile}
        setEducationFields={setEducationFields}
        setTextExperience={setTextExperience}
        textExperience={textExperience}
        setWorkExperienceFields={setWorkExperienceFields}
      />
      {/* Right section PDF viewer*/}
      <section className="w-full hidden lg:block md:w-[35%] lg:w-[41%] lg:fixed lg:right-0 h-full">
        {showPreview && (
          <MobilePopUp isModalNeedIt={true}>
            <DynamicPDFViewer style={{ width: '100%', height: '100%' }}>
              <Document>
                <Page style={styles.page} wrap>
                  <View style={styles.firstColumn} fixed>
                    <Text style={styles.heading}>
                      {debouncedFormData.fullName}
                    </Text>
                    <View style={styles.spacing}>
                      <Text style={styles.subtitle}>
                        {debouncedFormData.jobTitle}
                      </Text>
                    </View>
                    {textProfile.length > 0 && (
                      <View>
                        <Text style={styles.subtitle}>Profile:</Text>
                        <Text style={styles.profileText}>
                          {debouncedTextProfile}
                        </Text>
                      </View>
                    )}
                    {workExperienceFields.length > 0 && (
                      <View>
                        <Text style={styles.subtitle}>Employment History:</Text>
                        {workExperienceFields.map((experience, index) => (
                          <View key={index}>
                            <Text style={styles.thirdTitle}>
                              {`${experience.jobTitleXp} at ${experience.employer}, ${experience.cityXp}`}
                            </Text>
                            <Text style={styles.thirdTitle}>
                              {`${experience.startDate} - ${experience.endDate}`}
                            </Text>
                            {textExperience?.length > 0 && (
                              <View>
                                {textExperience?.map((bullet, bulletIndex) => (
                                  <View key={bulletIndex}>
                                    <Text
                                      style={styles.bulletPoint}
                                    >{`${bullet}`}</Text>
                                  </View>
                                ))}
                              </View>
                            )}
                          </View>
                        ))}
                      </View>
                    )}
                    {educationFields.length > 0 && (
                      <View>
                        <Text style={styles.subtitle}>Education: </Text>
                        {educationFields.map((education, index) => (
                          <Fragment key={index}>
                            <Text style={styles.thirdTitle}>
                              {`${education.degree}, ${education.institution}, ${education.city}`}
                            </Text>
                            <Text style={styles.profileText}>
                              {`${education.startDate} - ${education.endDate}`}
                            </Text>
                          </Fragment>
                        ))}
                      </View>
                    )}
                  </View>
                  <View style={styles.secondColumn}>
                    <View style={styles.pictureContainer}>
                      <Image
                        src={`http://localhost:1337${user?.avatar?.formats?.thumbnail?.url}`}
                      />
                    </View>
                    {debouncedFormData.fullName &&
                      debouncedFormData.domainOfStudy && (
                        <View>
                          <Text style={styles.subtitle}>Details</Text>
                          <Text style={styles.profileText}>
                            {debouncedFormData.domainOfStudy}
                          </Text>

                          <Text style={styles.phoneDetail}>
                            {debouncedFormData.phone}
                          </Text>
                          <Text style={styles.subtitle}>E-mail:</Text>
                          <Text style={styles.profileText}>
                            {debouncedFormData.email}
                          </Text>
                          {/* Add other customer info based on the formData */}
                          <Text style={styles.subtitle}>Nationality:</Text>
                          <Text style={styles.profileText}>
                            {debouncedFormData.nationality}
                          </Text>
                        </View>
                      )}
                  </View>
                </Page>
              </Document>
            </DynamicPDFViewer>
          </MobilePopUp>
        )}
        <DynamicPDFViewer style={{ width: '100%', height: '100%' }}>
          <Document>
            <Page style={styles.page} wrap>
              <View style={styles.firstColumn} fixed>
                <Text style={styles.heading}>{debouncedFormData.fullName}</Text>
                <Text style={styles.spacing}>
                  <Text style={styles.subtitle}>
                    {debouncedFormData.jobTitle}
                  </Text>
                </Text>
                {textProfile.length > 0 && (
                  <View>
                    <Text style={styles.subtitle}>Profile: </Text>
                    <Text style={styles.profileText}>
                      {debouncedTextProfile}
                    </Text>
                  </View>
                )}
                {workExperienceFields.length > 0 && (
                  <View>
                    <Text style={styles.subtitle}>Employment History: </Text>
                    {workExperienceFields.map((experience, index) => (
                      <View key={index}>
                        <Text style={styles.thirdTitle}>
                          {`${experience.jobTitleXp} at ${experience.employer}, ${experience.cityXp}`}
                        </Text>
                        <Text style={styles.thirdTitle}>
                          {`${experience.startDate} - ${experience.endDate}`}
                        </Text>
                        {textExperience.length > 0 && (
                          <View>
                            {textExperience.map((bullet, bulletIndex) => (
                              <View key={bulletIndex}>
                                <Text
                                  style={styles.bulletPoint}
                                >{`${bullet}`}</Text>
                              </View>
                            ))}
                          </View>
                        )}
                      </View>
                    ))}
                  </View>
                )}
                {educationFields.length > 0 && (
                  <View>
                    <Text style={styles.subtitle}>Education: </Text>
                    {educationFields.map((education, index) => (
                      <Fragment key={index}>
                        <Text style={styles.thirdTitle}>
                          {`${education.degree}, ${education.institution}, ${education.city}`}
                        </Text>
                        <Text style={styles.profileText}>
                          {`${education.startDate} - ${education.endDate}`}
                        </Text>
                      </Fragment>
                    ))}
                  </View>
                )}
              </View>
              <View style={styles.secondColumn}>
                <View style={styles.pictureContainer}>
                  <Image
                    src={`http://localhost:1337${user?.avatar?.formats?.thumbnail?.url}`}
                  />
                </View>
                {debouncedFormData.fullName &&
                  debouncedFormData.domainOfStudy && (
                    <View>
                      <Text style={styles.subtitle}>Details</Text>
                      <Text style={styles.profileText}>
                        {debouncedFormData.domainOfStudy}
                      </Text>

                      <Text style={styles.phoneDetail}>
                        {debouncedFormData.phone}
                      </Text>
                      <Text style={styles.subtitle}>E-mail:</Text>
                      <Text style={styles.profileText}>
                        {debouncedFormData.email}
                      </Text>
                      {/* Add other customer info based on the formData */}
                      <Text style={styles.subtitle}>Nationality:</Text>
                      <Text style={styles.profileText}>
                        {debouncedFormData.nationality}
                      </Text>
                    </View>
                  )}
              </View>
            </Page>
          </Document>
        </DynamicPDFViewer>
      </section>
      {/* Mobile button section */}
      <section>
        <button
          className="fixed bottom-5 right-4 bg-indigo-500 text-white px-4 py-2 rounded-md lg:hidden"
          onClick={togglePreview}
        >
          Preview
        </button>
      </section>
    </div>
  );
};

export default MyDocument;
