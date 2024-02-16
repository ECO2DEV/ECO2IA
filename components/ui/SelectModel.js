export const SelectModel = ({ modelOptions, onChange }) => {
  return (
    <select
      onChange={onChange}
      className="pt-1 pb-1 bg-primary hover:bg-primaryHover text-white rounded-md cursor-pointer"
    >
      {modelOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
