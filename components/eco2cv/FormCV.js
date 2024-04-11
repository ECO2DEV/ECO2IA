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
        <div className="flex-1 flex flex-col">
          <label htmlFor="fullName" className="text-black dark:text-eco2MainColor">
            {' '}
            {DataEco2CV.FullName}{' '}
          </label>
          <input
            className="flex-1 p-2 border-white rounded custom-input bg-darkBgCard dark:bg-white text-white dark:text-black"
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
          <label className="text-black dark:text-eco2MainColor" htmlFor="jobTitle">
            {' '}
            {DataEco2CV.JobTitle}{' '}
          </label>
          <input
            className="flex-1 p-2 border-white rounded custom-input bg-darkBgCard dark:bg-white text-white dark:text-black"
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
          <label className="text-black dark:text-eco2MainColor" htmlFor="domainOfStudy">
            {' '}
            {DataEco2CV.DomainofStudy}{' '}
          </label>
          <input
            className="p-2 border-white rounded custom-input bg-darkBgCard dark:bg-white text-white dark:text-black w-full"
            type="text"
            placeholder={DataEco2CV.DomainofStudy}
            name="domainOfStudy"
            value={formData?.domainOfStudy ? formData.domainOfStudy : ''}
            onChange={handleChange}
          />
        </div>
        <div className="flex-1 flex flex-col">
          <label className="text-black dark:text-eco2MainColor" htmlFor="nationality">
            {' '}
            {DataEco2CV.Nationality}{' '}
          </label>
          <input
            className="p-2 border-white rounded custom-input bg-darkBgCard dark:bg-white text-white dark:text-black w-full"
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
          <label className="text-black dark:text-eco2MainColor" htmlFor="email">
            {' '}
            {DataEco2CV.Email}{' '}
          </label>
          <input
            className="p-2 border-white rounded custom-input bg-darkBgCard dark:bg-white text-white dark:text-black w-full"
            type="email"
            name="email"
            value={formData?.email ? formData.email : ''}
            onChange={handleChange}
          />
        </div>
        <div className="flex-1 flex flex-col">
          <label className="text-black dark:text-eco2MainColor" htmlFor="phone">
            {' '}
            {DataEco2CV.Telephone}{' '}
          </label>
          <input
            className="p-2 border-white rounded custom-input bg-darkBgCard dark:bg-white text-white dark:text-black w-full"
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
          <label className="text-black dark:text-eco2MainColor" htmlFor="country">
            {' '}
            {DataEco2CV.Country}{' '}
          </label>
          <input
            className="p-2 border-white rounded custom-input bg-darkBgCard dark:bg-white text-white dark:text-black w-full"
            type="text"
            placeholder={DataEco2CV.Country}
            name="country"
            value={formData?.country ? formData.country : ''}
            onChange={handleChange}
          />
        </div>
        <div className="flex-1 flex flex-col">
          <label className="text-black dark:text-eco2MainColor" htmlFor="city">
            {' '}
            {DataEco2CV.City}{' '}
          </label>
          <input
            className="p-2 border-white rounded custom-input bg-darkBgCard dark:bg-white text-white dark:text-black w-full"
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
