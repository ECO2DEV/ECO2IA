import { DataEco2CV } from "../../data/eco2cv";
import { Fragment } from "react";
import {
  Page,
  Text,
  View,
  Document,
  Image,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import dynamic from "next/dynamic";
import { stylesOne } from "./TemplatesStyles";
import { useSession } from "next-auth/react";

const DynamicPDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
  }
);
import { strapiUrl } from "../../constants/constans";

export const PDFTemplateOne = ({
  spokenLanguages,
  debouncedFormData,
  debouncedTextProfile,
  user,
  textProfile,
  dropdowns,
  educationFields,
}) => {
  const { data: session } = useSession();

  const hasProfileEducation =
    user?.titulo_academico &&
    user?.universidad &&
    user?.fecha_ini_academica &&
    user?.fecha_fin_academica &&
    user?.ciudad_uni;

  // Añadir la información académica del perfil del usuario al principio de educationFields si existe
  const combinedEducationFields = hasProfileEducation
    ? [
        {
          degree: user.titulo_academico,
          institution: user.universidad,
          startDate: user.fecha_ini_academica,
          endDate: user.fecha_fin_academica,
          city: user.ciudad_uni,
        },
        ...educationFields,
      ]
    : educationFields;

  return (
    <DynamicPDFViewer style={{ width: "100%", height: "100%" }}>
      <Document>
        <Page style={stylesOne.page} wrap>
          <View style={stylesOne.firstColumn} fixed>
            <Text style={stylesOne.heading}>{debouncedFormData.fullName}</Text>
            <View style={stylesOne.spacing}>
              <Text style={stylesOne.subtitle}>
                {debouncedFormData.jobTitle}
              </Text>
            </View>
            {textProfile.length > 0 && (
              <View>
                <Text style={stylesOne.subtitle}>{DataEco2CV.Profile}</Text>
                <Text style={stylesOne.profileText}>
                  {debouncedTextProfile}
                </Text>
              </View>
            )}
            {dropdowns.length > 0 && (
              <View>
                <Text style={stylesOne.subtitle}>
                  {DataEco2CV.EmploymentHistory}
                </Text>
                {dropdowns.map((experience, index) => (
                  <View key={index}>
                    <Text style={stylesOne.thirdTitle}>
                      {`${experience.jobTitleXp} at ${experience.employer}, ${experience.cityXp}`}
                    </Text>
                    <Text style={stylesOne.thirdTitle}>
                      {`${experience.startDate} - ${experience.endDate}`}
                    </Text>
                    {experience?.description?.length > 0 && (
                      <View>
                        {experience?.description?.map((bullet, bulletIndex) => (
                          <View key={bulletIndex}>
                            <Text
                              style={stylesOne.bulletPoint}
                            >{`${bullet}`}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                ))}
              </View>
            )}
            {combinedEducationFields.length > 0 && (
              <View>
                <Text style={stylesOne.subtitle}>
                  {DataEco2CV.EducationBackground}
                </Text>
                {combinedEducationFields.map((education, index) => (
                  <Fragment key={index}>
                    <Text style={stylesOne.thirdTitle}>
                      {`${education.degree}, ${education.institution}, ${education.city}`}
                    </Text>
                    <Text style={stylesOne.profileText}>
                      {`${education.startDate} - ${education.endDate}`}
                    </Text>
                  </Fragment>
                ))}
              </View>
            )}
          </View>
          <View style={stylesOne.secondColumn}>
            <View style={stylesOne.pictureContainer}>
              <Image
                width={200}
                height={200}
                src={
                  user?.avatar
                    ? user?.avatar?.url
                    : session?.picture
                    ? session?.picture
                    : "/empty_avatar.webp"
                }
                alt="Avatar preview"
              />
            </View>
            {debouncedFormData.fullName && debouncedFormData.domainOfStudy && (
              <View>
                <Text style={stylesOne.subtitle}>{DataEco2CV.Details}</Text>
                <Text style={stylesOne.profileText}>
                  {debouncedFormData.domainOfStudy}
                </Text>

                <Text style={stylesOne.phoneDetail}>
                  {debouncedFormData.phone}
                </Text>
                <Text style={stylesOne.subtitle}>{DataEco2CV.Email}</Text>
                <Text style={stylesOne.profileText}>
                  {debouncedFormData.email}
                </Text>
                {/* Add other customer info based on the formData */}
                <Text style={stylesOne.subtitle}>{DataEco2CV.Nationality}</Text>
                <Text style={stylesOne.profileText}>
                  {debouncedFormData.nationality}
                </Text>
              </View>
            )}
            {spokenLanguages.length > 0 && (
              <View>
                <Text style={stylesOne.subtitle}>Idiomas</Text>
                {spokenLanguages.map((language, index) => (
                  <Fragment key={index}>
                    <Text style={stylesOne.profileText}>
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
