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
      <div className="flex mb-4 space-x-4">
        <input
          className="flex-1 p-2 border rounded"
          type="text"
          placeholder="Full name"
          name="fullName"
          value={formData?.fullName ? formData.fullName : ''}
          onChange={handleChange}
        />
      </div>
      <div className="flex mb-4 space-x-4">
        <input
          className="flex-1 p-2 border rounded"
          type="text"
          placeholder="Job Title"
          name="jobTitle"
          value={formData?.jobTitle ? formData.jobTitle : ''}
          onChange={handleChange}
        />
      </div>

      <div className="flex mb-4 space-x-4">
        <input
          className="flex-1 p-2 border rounded"
          type="text"
          placeholder="Domain of Study"
          name="domainOfStudy"
          value={formData?.domainOfStudy ? formData.domainOfStudy : ''}
          onChange={handleChange}
        />
        <input
          className="flex-1 p-2 border rounded"
          type="text"
          placeholder="Nationality"
          name="nationality"
          value={formData?.nationality ? formData.nationality : ''}
          onChange={handleChange}
        />
      </div>

      <div className="flex mb-4 space-x-4">
        <input
          className="flex-1 p-2 border rounded"
          type="email"
          placeholder="Email"
          name="email"
          value={formData?.email ? formData.email : ''}
          onChange={handleChange}
        />
        <input
          className="flex-1 p-2 border rounded"
          type="text"
          placeholder="Phone"
          name="phone"
          value={formData?.phone ? formData.phone : ''}
          onChange={handleChange}
        />
      </div>

      <div className="flex mb-4 space-x-4">
        <input
          className="flex-1 p-2 border rounded"
          type="text"
          placeholder="Country"
          name="country"
          value={formData?.country ? formData.country : ''}
          onChange={handleChange}
        />
        <input
          className="flex-1 p-2 border rounded"
          type="text"
          placeholder="City"
          name="city"
          value={formData?.city ? formData.city : ''}
          onChange={handleChange}
        />
      </div>
    </form>
  );
};
