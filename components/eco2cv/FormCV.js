import { DataEco2CV } from '../../data/eco2cv';
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
        <div className="flex-1 flex flex-col  dark:text-zinc-900">
          <label htmlFor="fullName"> {DataEco2CV.FullName} </label>
          <input
            className="flex-1 p-2 border dark:bg-[#21c284] rounded"
            type="text"
            placeholder={DataEco2CV.FullName}
            name="fullName"
            value={formData?.fullName ? formData.fullName : ''}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="mb-4 space-x-4 w-full">
        <div className="flex-1 flex flex-col">
          <label htmlFor="jobTitle"> {DataEco2CV.JobTitle} </label>
          <input
            className="flex-1 p-2 border rounded dark:bg-[#21c284] dark:text-zinc-900"
            type="text"
            placeholder={DataEco2CV.JobTitle}
            name="jobTitle"
            value={formData?.jobTitle ? formData.jobTitle : ''}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex mb-4 space-x-4">
        <div className="flex-1 flex flex-col">
          <label htmlFor="domainOfStudy"> {DataEco2CV.DomainofStudy} </label>
          <input
            className="p-2 border rounded w-full dark:bg-[#21c284] dark:text-zinc-900"
            type="text"
            placeholder={DataEco2CV.DomainofStudy}
            name="domainOfStudy"
            value={formData?.domainOfStudy ? formData.domainOfStudy : ''}
            onChange={handleChange}
          />
        </div>
        <div className="flex-1 flex flex-col">
          <label htmlFor="nationality"> {DataEco2CV.Nationality} </label>
          <input
            className="p-2 border rounded w-full dark:bg-[#21c284] dark:text-zinc-900"
            type="text"
            placeholder={DataEco2CV.Nationality}
            name="nationality"
            value={formData?.nationality ? formData.nationality : ''}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex mb-4 space-x-4">
        <div className="flex-1 flex flex-col">
          <label htmlFor="email"> {DataEco2CV.Email} </label>
          <input
            className="p-2 border rounded w-full dark:bg-[#21c284] dark:text-zinc-900"
            type="email"
            name="email"
            value={formData?.email ? formData.email : ''}
            onChange={handleChange}
          />
        </div>
        <div className="flex-1 flex flex-col">
          <label htmlFor="phone"> {DataEco2CV.Telephone} </label>
          <input
            className="p-2 border rounded w-full dark:bg-[#21c284] dark:text-zinc-900"
            type="text"
            placeholder={DataEco2CV.Telephone}
            name="phone"
            value={formData?.phone ? formData.phone : ''}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex mb-4 space-x-4">
        <div className="flex-1 flex flex-col">
          <label htmlFor="country"> {DataEco2CV.Country} </label>
          <input
            className="p-2 border rounded w-full dark:bg-[#21c284] dark:text-zinc-900"
            type="text"
            placeholder={DataEco2CV.Country}
            name="country"
            value={formData?.country ? formData.country : ''}
            onChange={handleChange}
          />
        </div>
        <div className="flex-1 flex flex-col">
          <label htmlFor="city"> {DataEco2CV.City} </label>
          <input
            className="p-2 border rounded w-full dark:bg-[#21c284] dark:text-zinc-900"
            type="text"
            placeholder={DataEco2CV.City}
            name="city"
            value={formData?.city ? formData.city : ''}
            onChange={handleChange}
          />
        </div>
      </div>
    </form>
  );
};
