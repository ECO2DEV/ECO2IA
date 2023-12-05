export const SelectModel = ({ options, onChange }) => {
  return (
    <select
      onChange={onChange}
      className="pt-1 pb-1 bg-gray-800 text-white rounded-md cursor-pointer"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
