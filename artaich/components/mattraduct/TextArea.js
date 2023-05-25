const getPlaceholder = ({ type, loading }) => {
  if (type === 'from') return 'Introducir texto';
  if (loading === true) return 'Cargando...';
  return 'Traducción';
};

export const TextArea = ({ type, loading, value, onChange }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <textarea
      autoFocus={type === 'from'}
      disabled={type === 'to'}
      placeholder={getPlaceholder({ type, loading })}
      className={` pl-1 border-0 resize-none rounded-b-md ${
        type === 'from' ? '' : 'border-gray-200'
      }
      ${
        type === 'from'
          ? 'h-[160px] sm:h-[200px] lg:h-[240px] w-full bg-gray-800 text-gray-100'
          : 'h-[160px] w-full sm:h-[200px] lg:h-[240px] xl:h-[280px] bg-gray-200'
      }`}
      value={value}
      onChange={handleChange}
    />
  );
};
