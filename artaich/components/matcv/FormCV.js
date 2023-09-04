import { DataMattCV } from '../../data/mattcv';
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
    <form className="w-full mt-8">
      <div className="mb-4 space-x-4 w-full">
        <div className="flex-1 flex flex-col">
          <label htmlFor="fullName"> {DataMattCV.FullName} </label>
          <input
            className="flex-1 p-2 border rounded"
            type="text"
            placeholder={DataMattCV.FullName}
            name="fullName"
            value={formData?.fullName ? formData.fullName : ''}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="mb-4 space-x-4 w-full">
        <div className="flex-1 flex flex-col">
          <label htmlFor="jobTitle"> {DataMattCV.JobTitle} </label>
          <input
            className="flex-1 p-2 border rounded"
            type="text"
            placeholder={DataMattCV.JobTitle}
            name="jobTitle"
            value={formData?.jobTitle ? formData.jobTitle : ''}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex mb-4 space-x-4">
        <div className="flex-1 flex flex-col">
          <label htmlFor="domainOfStudy"> {DataMattCV.DomainofStudy} </label>
          <input
            className="p-2 border rounded w-full"
            type="text"
            placeholder={DataMattCV.DomainofStudy}
            name="domainOfStudy"
            value={formData?.domainOfStudy ? formData.domainOfStudy : ''}
            onChange={handleChange}
          />
        </div>
        <div className="flex-1 flex flex-col">
          <label htmlFor="nationality"> {DataMattCV.Nationality} </label>
          <input
            className="p-2 border rounded w-full"
            type="text"
            placeholder={DataMattCV.Nationality}
            name="nationality"
            value={formData?.nationality ? formData.nationality : ''}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex mb-4 space-x-4">
        <div className="flex-1 flex flex-col">
          <label htmlFor="email"> {DataMattCV.Email} </label>
          <input
            className="p-2 border rounded w-full"
            type="email"
            name="email"
            value={formData?.email ? formData.email : ''}
            onChange={handleChange}
          />
        </div>
        <div className="flex-1 flex flex-col">
          <label htmlFor="phone"> {DataMattCV.Telephone} </label>
          <input
            className="p-2 border rounded w-full"
            type="text"
            placeholder={DataMattCV.Telephone}
            name="phone"
            value={formData?.phone ? formData.phone : ''}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex mb-4 space-x-4">
        <div className="flex-1 flex flex-col">
          <label htmlFor="country"> {DataMattCV.Country} </label>
          <input
            className="p-2 border rounded w-full"
            type="text"
            placeholder={DataMattCV.Country}
            name="country"
            value={formData?.country ? formData.country : ''}
            onChange={handleChange}
          />
        </div>
        <div className="flex-1 flex flex-col">
          <label htmlFor="city"> {DataMattCV.City} </label>
          <input
            className="p-2 border rounded w-full"
            type="text"
            placeholder={DataMattCV.City}
            name="city"
            value={formData?.city ? formData.city : ''}
            onChange={handleChange}
          />
        </div>
      </div>
    </form>
  );
};
