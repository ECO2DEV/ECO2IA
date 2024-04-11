import { DataEco2CV } from "../../data/eco2cv";
import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import { Fragment } from "react";
import dynamic from "next/dynamic";
import { stylesTwo } from "./TemplatesStyles";
import { useSession } from "next-auth/react";

const DynamicPDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
  }
);
import { strapiUrl } from "../../constants/constans";

export const PDFTemplateTwo = ({
  spokenLanguages,
  debouncedFormData,
  debouncedTextProfile,
  dropdowns,
  user,
  textProfile,
  educationFields,
}) => {
  const { data: session } = useSession();

  return (
    <DynamicPDFViewer style={{ width: "100%", height: "100%" }}>
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
                <Text style={stylesTwo.subtitle}>{DataEco2CV.Profile}</Text>
                <Text style={stylesTwo.profileText}>
                  {debouncedTextProfile}
                </Text>
              </View>
            )}
            {dropdowns.length > 0 && (
              <View>
                <Text style={stylesTwo.subtitle}>
                  {DataEco2CV.EmploymentHistory}
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
                  {DataEco2CV.EducationBackgrounde}
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
            <View style={stylesTwo.pictureContainer2}>
              <Image
                width={stylesTwo.widthImage}
                height={stylesTwo.heightImage}
                src={
                  user?.avatar
                    ? user?.avatar?.url
                    : session?.picture
                    ? session?.picture
                    : "/empty_avatar.webp"
                }
                alt="Avatar preview"
                // className={`w-full h-full mx-auto object-cover rounded-full border-none shadow-lg `}
              />
            </View>
            {debouncedFormData.fullName && debouncedFormData.domainOfStudy && (
              <View>
                <Text style={stylesTwo.subtitle}>{DataEco2CV.Details}</Text>
                <Text style={stylesTwo.profileText}>
                  {debouncedFormData.domainOfStudy}
                </Text>

                <Text style={stylesTwo.phoneDetail}>
                  {debouncedFormData.phone}
                </Text>
                <Text style={stylesTwo.subtitle}>{DataEco2CV.Email}</Text>
                <Text style={stylesTwo.profileText}>
                  {debouncedFormData.email}
                </Text>
                {/* Add other customer info based on the formData */}
                <Text style={stylesTwo.subtitle}>{DataEco2CV.Nationality}</Text>
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
