export const SelectModel = ({ modelOptions, onChange }) => {
  return (
    <select
      onChange={onChange}
      className="pt-1 pb-1 group rounded-md cursor-pointer dark:text-black "
    >
      {modelOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
