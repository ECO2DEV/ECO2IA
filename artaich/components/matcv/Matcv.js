import { useState } from 'react';
import MyDocument from './MyDocument';

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

  return (
    <div>
      <MyDocument formData={formData} setFormData={setFormData} />
    </div>
  );
};

export default MatcvIA;
