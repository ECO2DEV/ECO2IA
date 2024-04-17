import { AUTO_LANGUAGE } from '../../constants/constans';
import { DataEco2Traduct } from '../../data/eco2traduct';

export const DetectionLanguage = ({ onChange, type, value }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };
  return (
    <select
      className="bg-darkBgCard dark:bg-darkBgCard rounded-md text-[0.60rem] leading-none sm:text-lg text-white dark:text-white custom-input"
      aria-label="Seleccione el idioma"
      onChange={handleChange}
      value={value}
    >
      {type === 'from' && (
        <option value={AUTO_LANGUAGE}>
          {DataEco2Traduct.ButtonDetectLanguage}{' '}
        </option>
      )}
    </select>
  );
};
