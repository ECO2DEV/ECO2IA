import { useState, useContext } from 'react';
import { UserContext } from '../../context/user/UserContext';
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
  FirstColumn: {
    flexBasis: '60%',
    marginRight: '10mm'
  },
  SecondColumn: {
    flexBasis: '40%'
  },
  heading: {
    marginBottom: '5mm',
    fontWeight: 'bold'
  },
  profileText: {
    marginBottom: '5mm'
  },
  pictureContainer: {
    width: '40mm',
    height: '40mm',
    marginBottom: '5mm',
    backgroundColor: '#DDD'
  },
  skillsText: {
    marginBottom: '5mm'
  },
  languagesText: {
    marginBottom: '5mm'
  }
});

const MyDocument = ({ titleText, paragraphText }) => {
  const { user } = useContext(UserContext);
  console.log(
    'avatar1',
    `http://localhost:1337${user?.avatar?.formats?.thumbnail?.url}`
  );
  return (
    <div className="flex flex-col md:flex-row h-screen gap-2">
      <div className="md:w-[55%]">
        <h1>Personal details</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam
          quasi sint soluta aliquam nam culpa ad similique blanditiis eius
          voluptatem.
        </p>
        <FormCV />
      </div>
      <div className="w-full md:w-[45%] h-full">
        <DynamicPDFViewer style={{ width: '100%', height: '100%' }}>
          <Document>
            <Page size="A4" style={styles.page}>
              <View style={styles.FirstColumn}>
                <Text style={styles.heading}>Profile</Text>
                <Text style={styles.profileText}>
                  <Text style={styles.heading}>Full Name: </Text> John Doe{'\n'}
                  <Text style={styles.heading}>Profile: </Text> Software
                  Engineer with a passion for web development and
                  problem-solving.{'\n'}
                  <Text style={styles.heading}>Employment History: </Text>-
                  Software Engineer at XYZ Company (2019 - Present){'\n'}- Web
                  Developer at ABC Agency (2016 - 2019){'\n'}
                  <Text style={styles.heading}>Education: </Text>- Bachelor's
                  Degree in Computer Science, XYZ University (2015 - 2019){'\n'}
                  - Online Web Development Course, Udemy (2015)
                </Text>
              </View>
              <View style={styles.SecondColumn}>
                <View style={styles.pictureContainer}>
                  <Image
                    src={`http://localhost:1337${user?.avatar?.formats?.thumbnail?.url}`}
                  />
                </View>
                <Text style={styles.heading}>Skills</Text>
                <Text style={styles.skillsText}>
                  Leadership, Adaptability,Time Management
                </Text>
                <Text style={styles.heading}>Languages</Text>
                <Text style={styles.languagesText}>
                  English advanced, Spanish native, French advanced
                </Text>
              </View>
            </Page>
          </Document>
        </DynamicPDFViewer>
      </div>
    </div>
  );
};

const MatcvIA = () => {
  const [titleText, setTitleText] = useState('mundo cruel');
  const [paragraphText, setParagraphText] = useState(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.'
  );

  return (
    <div>
      <MyDocument titleText={titleText} paragraphText={paragraphText} />
    </div>
  );
};

export default MatcvIA;
