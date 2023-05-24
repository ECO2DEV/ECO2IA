import { SUPPORTED_LENGUAGES, AUTO_LANGUAGE } from '../../constants/constans';

export const LanguageSelector = ({ onChange, type, value }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };
  return (
    <select
      className="bg-gray-800 rounded-md"
      aria-label="Seleccione el idioma"
      onChange={handleChange}
      value={value}
    >
      {type === 'from' && (
        <option value={AUTO_LANGUAGE}>Detectar idioma</option>
      )}
      {Object.entries(SUPPORTED_LENGUAGES).map(([key, value]) => (
        <option key={key} value={key}>
          {value}
        </option>
      ))}
    </select>
  );
};
