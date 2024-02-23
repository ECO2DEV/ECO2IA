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

  return (
    <div className="dark:bg-darkColor bg-lightColor md:h-[215vh]">
      <MyDocument formData={formData} setFormData={setFormData} />
    </div>
  );
};

export default Eco2cvIA;
