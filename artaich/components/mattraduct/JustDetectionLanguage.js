import { SUPPORTED_LENGUAGES, AUTO_LANGUAGE } from '../../constants/constans';
import { DataMatTraduct } from '../../data/mattraduct';

export const DetectionLanguage = ({ onChange, type, value }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };
  return (
    <select
      className="bg-gray-800 rounded-md text-[0.70rem] leading-none sm:text-lg"
      aria-label="Seleccione el idioma"
      onChange={handleChange}
      value={value}
    >
      {type === 'from' && (
        <option value={AUTO_LANGUAGE}> {DataMatTraduct.ButtonDetectLanguage} </option>
      )}
    </select>
  );
};