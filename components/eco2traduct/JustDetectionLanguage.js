import { SUPPORTED_LENGUAGES, AUTO_LANGUAGE } from '../../constants/constans';
import { DataEco2Traduct } from '../../data/eco2traduct';

export const DetectionLanguage = ({ onChange, type, value }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };
  return (
    <select
      className="bg-[#053220] rounded-md text-[0.70rem] leading-none sm:text-lg"
      aria-label="Seleccione el idioma"
      onChange={handleChange}
      value={value}
    >
      {type === 'from' && (
        <option value={AUTO_LANGUAGE}> {DataEco2Traduct.ButtonDetectLanguage} </option>
      )}
    </select>
  );
};