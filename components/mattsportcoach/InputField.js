export const InputField = ({ label, id, value, onChange, type = "text" }) => {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required
        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none bg-[#21c284] focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
      />
    </div>
  );
};
