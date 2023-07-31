import { DataMattCV } from "../../data/mattcv";
export const FormCV = ({ formData, setFormData }) => {
  // Initialize state to hold the form data

  // Handle input changes and update the state accordingly
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  return (
    <form className="w-full md:max-w-md mx-auto mt-8">
      <div className="flex mb-4 space-x-4">
        <input
          className="flex-1 p-2 border rounded"
          type="text"
          placeholder={DataMattCV.FullName}
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />
      </div>
      <div className="flex mb-4 space-x-4">
        <input
          className="flex-1 p-2 border rounded"
          type="text"
          placeholder={DataMattCV.JobTitle}
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
        />
      </div>

      <div className="flex mb-4 space-x-4">
        <input
          className="flex-1 p-2 border rounded"
          type="text"
          placeholder={DataMattCV.DomainofStudy}
          name="domainOfStudy"
          value={formData.domainOfStudy}
          onChange={handleChange}
        />
        <input
          className="flex-1 p-2 border rounded"
          type="text"
          placeholder={DataMattCV.Nationality}
          name="nationality"
          value={formData.nationality}
          onChange={handleChange}
        />
      </div>

      <div className="flex mb-4 space-x-4">
        <input
          className="flex-1 p-2 border rounded"
          type="email"
          placeholder={DataMattCV.Email}
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          className="flex-1 p-2 border rounded"
          type="text"
          placeholder={DataMattCV.Telephone}
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <div className="flex mb-4 space-x-4">
        <input
          className="flex-1 p-2 border rounded"
          type="text"
          placeholder={DataMattCV.Country}
          name="country"
          value={formData.country}
          onChange={handleChange}
        />
        <input
          className="flex-1 p-2 border rounded"
          type="text"
          placeholder={DataMattCV.City}
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
      </div>
    </form>
  );
};
