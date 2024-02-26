export const SelectModel = ({ modelOptions, onChange }) => {
  return (
    <select
      onChange={onChange}
      className="pt-1 pb-1 bg-eco2MainColor hover:bg-eco2HoverColor text-white rounded-md cursor-pointer"
    >
      {modelOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
