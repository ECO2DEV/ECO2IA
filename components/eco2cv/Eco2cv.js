import { useState } from 'react';
import MyDocument from './MyDocument';

const Eco2cvIA = () => {
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

export default Eco2cvIA;
