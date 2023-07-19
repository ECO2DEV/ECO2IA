export const FormCV = () => {
  return (
    <form className="w-full md:max-w-md mx-auto mt-8">
      <input
        className="w-full mb-4 p-2 border rounded"
        type="text"
        placeholder="Job title"
      />

      <div className="flex mb-4 space-x-4">
        <input
          className="flex-1 p-2 border rounded"
          type="text"
          placeholder="Name"
        />
        <input
          className="flex-1 p-2 border rounded"
          type="text"
          placeholder="Last name"
        />
      </div>

      <div className="flex mb-4 space-x-4">
        <input
          className="flex-1 p-2 border rounded"
          type="email"
          placeholder="Email"
        />
        <input
          className="flex-1 p-2 border rounded"
          type="text"
          placeholder="Phone"
        />
      </div>

      <div className="flex mb-4 space-x-4">
        <input
          className="flex-1 p-2 border rounded"
          type="text"
          placeholder="Country"
        />
        <input
          className="flex-1 p-2 border rounded"
          type="text"
          placeholder="City"
        />
      </div>

      <div className="flex mb-4 space-x-4">
        <input
          className="flex-1 p-2 border rounded"
          type="text"
          placeholder="Birthday"
        />
        <input
          className="flex-1 p-2 border rounded"
          type="text"
          placeholder="Nationality"
        />
      </div>
    </form>
  );
};
