import { useState } from 'react';
import MyDocument from './MyDocument';

const MatcvIA = () => {
  const [formData, setFormData] = useState({
    fullName: ' ',
    jobTitle: ' ',
    domainOfStudy: ' ',
    nationality: ' ',
    email: ' ',
    phone: ' ',
    country: ' ',
    city: ' '
  });

  return <MyDocument formData={formData} setFormData={setFormData} />;
};

export default MatcvIA;
