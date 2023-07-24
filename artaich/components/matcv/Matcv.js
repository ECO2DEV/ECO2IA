import { useState, useContext, Fragment } from 'react';
import { UserContext } from '../../context/user/UserContext';
import { TextAreaProfile } from './TextAreaProfile';
import { TextAreaExperience } from './TextAreaExperience';
import TextAreaEducation from './TextAreaEducation';
import dynamic from 'next/dynamic';

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image
} from '@react-pdf/renderer';
import { FormCV } from './FormCV';

const DynamicPDFViewer = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFViewer),
  {
    ssr: false
  }
);

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

const MyDocument = ({
  formData,
  setFormData,
  formExperienceFields,
  setFormExperienceFields
}) => {
  const { user } = useContext(UserContext);
  const [textProfile, setTextProfile] = useState('');
  const [textExperience, setTextExperience] = useState('');
  const [educationFields, setEducationFields] = useState([]);

  return (
    <div className="flex flex-col md:flex-row h-screen gap-2 relative">
      <div className="md:w-[50%] md:absolute md:left-0">
        <h1 className="text-xl font-bold">Personal details</h1>
        <p className="text-xs">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam
          quasi sint soluta aliquam nam culpa ad similique blanditiis eius
          voluptatem.
        </p>
        <FormCV formData={formData} setFormData={setFormData} />
        <TextAreaProfile
          textProfile={textProfile}
          setTextProfile={setTextProfile}
        />
        <TextAreaEducation setEducationFields={setEducationFields} />
        <TextAreaExperience
          formExperienceFields={formExperienceFields}
          setFormExperienceFields={setFormExperienceFields}
          textExperience={textExperience}
          setTextExperience={setTextExperience}
        />
      </div>
      <div className="w-full md:w-[40%] md:fixed md:right-0 h-full">
        <DynamicPDFViewer style={{ width: '100%', height: '100%' }}>
          <Document>
            <Page size="A4" style={styles.page}>
              <View style={styles.firstColumn}>
                <Text style={styles.heading}>{formData.fullName}</Text>
                <Text style={styles.spacing}>
                  <Text style={styles.subtitle}>{formData.jobTitle}</Text>
                </Text>
                {textProfile.length > 0 && (
                  <>
                    <Text style={styles.subtitle}>Profile: </Text>
                    <Text style={styles.profileText}>{textProfile}</Text>
                  </>
                )}
                {(formExperienceFields.jobTitleXp ||
                  textExperience.length > 0) && (
                  <>
                    <Text style={styles.subtitle}>Employment History:</Text>
                    <Text style={styles.thirdTitle}>
                      {`${formExperienceFields.jobTitleXp} at ${formExperienceFields.employer}, ${formExperienceFields.cityXp}`}
                    </Text>
                    <Text style={styles.profileText}>
                      {`${formExperienceFields.startDate} - ${formExperienceFields.endDate}`}
                    </Text>
                    <Text style={styles.profileText}>{textExperience}</Text>
                  </>
                )}
                {educationFields.length > 0 && (
                  <>
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
                  </>
                )}
              </View>
              <View style={styles.secondColumn}>
                <View style={styles.pictureContainer}>
                  <Image
                    src={`http://localhost:1337${user?.avatar?.formats?.thumbnail?.url}`}
                  />
                </View>
                {formData.fullName && formData.domainOfStudy && (
                  <>
                    <Text style={styles.subtitle}>Details</Text>
                    <Text style={styles.profileText}>
                      {formData.domainOfStudy}
                    </Text>

                    <Text style={styles.phoneDetail}>{formData.phone}</Text>
                    <Text style={styles.subtitle}>E-mail: </Text>
                    <Text style={styles.profileText}>{formData.email}</Text>
                    {/* Add other customer info based on the formData */}
                    <Text style={styles.subtitle}>Nationality: </Text>
                    <Text style={styles.profileText}>
                      {formData.nationality}
                    </Text>
                  </>
                )}
              </View>
            </Page>
          </Document>
        </DynamicPDFViewer>
      </div>
    </div>
  );
};

const MatcvIA = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    jobTitle: '',
    domainOfStudy: '',
    nationality: '',
    email: '',
    phone: '',
    country: '',
    city: ''
  });
  const [formExperienceFields, setFormExperienceFields] = useState({
    jobTitleXp: '',
    employer: '',
    startDate: '',
    endDate: '',
    cityXp: '',
    presentWorking: false
  });

  return (
    <div>
      <MyDocument
        formData={formData}
        setFormData={setFormData}
        formExperienceFields={formExperienceFields}
        setFormExperienceFields={setFormExperienceFields}
      />
    </div>
  );
};

export default MatcvIA;
