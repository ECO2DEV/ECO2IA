import { DataMattCV } from '../../data/mattcv';
import { Page, Text, View, Document, Image } from '@react-pdf/renderer';
import { Fragment } from 'react';
import dynamic from 'next/dynamic';
import { stylesTwo } from './TemplatesStyles';
const DynamicPDFViewer = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFViewer),
  {
    ssr: false
  }
);

export const PDFTemplateTwo = ({
  spokenLanguages,
  debouncedFormData,
  debouncedTextProfile,
  dropdowns,
  user,
  textProfile,
  educationFields
}) => {
  return (
    <DynamicPDFViewer style={{ width: '100%', height: '100%' }}>
      <Document>
        <Page style={stylesTwo.page} wrap>
          <View style={stylesTwo.firstColumn} fixed>
            <Text style={stylesTwo.heading}>{debouncedFormData.fullName}</Text>
            <View style={stylesTwo.spacing}>
              <Text style={stylesTwo.subtitle}>
                {debouncedFormData.jobTitle}
              </Text>
            </View>
            {textProfile.length > 0 && (
              <View>
                <Text style={stylesTwo.subtitle}>{DataMattCV.Profile}</Text>
                <Text style={stylesTwo.profileText}>
                  {debouncedTextProfile}
                </Text>
              </View>
            )}
            {dropdowns.length > 0 && (
              <View>
                <Text style={stylesTwo.subtitle}>
                  {DataMattCV.EmploymentHistory}
                </Text>
                {dropdowns.map((experience, index) => (
                  <View key={index}>
                    <Text style={stylesTwo.thirdTitle}>
                      {`${experience.jobTitleXp} at ${experience.employer}, ${experience.cityXp}`}
                    </Text>
                    <Text style={stylesTwo.thirdTitle}>
                      {`${experience.startDate} - ${experience.endDate}`}
                    </Text>
                    {experience?.description?.length > 0 && (
                      <View>
                        {experience?.description?.map((bullet, bulletIndex) => (
                          <View key={bulletIndex}>
                            <Text
                              style={stylesTwo.bulletPoint}
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
                <Text style={stylesTwo.subtitle}>
                  {DataMattCV.EducationBackgrounde}
                </Text>
                {educationFields.map((education, index) => (
                  <Fragment key={index}>
                    <Text style={stylesTwo.thirdTitle}>
                      {`${education.degree}, ${education.institution}, ${education.city}`}
                    </Text>
                    <Text style={stylesTwo.profileText}>
                      {`${education.startDate} - ${education.endDate}`}
                    </Text>
                  </Fragment>
                ))}
              </View>
            )}
          </View>
          <View style={stylesTwo.secondColumn}>
            <View style={stylesTwo.pictureContainer}>
              <Image
                src={`http://localhost:1337${user?.avatar?.formats?.thumbnail?.url}`}
              />
            </View>
            {debouncedFormData.fullName && debouncedFormData.domainOfStudy && (
              <View>
                <Text style={stylesTwo.subtitle}>{DataMattCV.Details}</Text>
                <Text style={stylesTwo.profileText}>
                  {debouncedFormData.domainOfStudy}
                </Text>

                <Text style={stylesTwo.phoneDetail}>
                  {debouncedFormData.phone}
                </Text>
                <Text style={stylesTwo.subtitle}>{DataMattCV.Email}</Text>
                <Text style={stylesTwo.profileText}>
                  {debouncedFormData.email}
                </Text>
                {/* Add other customer info based on the formData */}
                <Text style={stylesTwo.subtitle}>{DataMattCV.Nationality}</Text>
                <Text style={stylesTwo.profileText}>
                  {debouncedFormData.nationality}
                </Text>
              </View>
            )}
            {spokenLanguages.length > 0 && (
              <View>
                <Text style={stylesTwo.heading}>Langues</Text>
                {spokenLanguages.map((language, index) => (
                  <Fragment key={index}>
                    <Text style={stylesTwo.thirdTitle}>
                      {`${language.name} - ${language.proficiency}`}
                    </Text>
                  </Fragment>
                ))}
              </View>
            )}
          </View>
        </Page>
      </Document>
    </DynamicPDFViewer>
  );
};
