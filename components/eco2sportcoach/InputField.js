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
        className="block w-full rounded-md border-eco2MainColor dark:border-white custom-input bg-white dark:bg-darkBgCard px-3.5 py-2 text-black dark:text-white shadow-sm ring-1 sm:text-sm sm:leading-6"
      />
    </div>
  );
};
