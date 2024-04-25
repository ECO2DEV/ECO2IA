
const DropdownFilter = ({selectedOption, setSelectedOption}) => {
  

  const handleOptionChange = (e) => {
    const option = e.target.value;
    setSelectedOption(option);
    
  };



  return (
    <select
    className="bg-darkColor text-gray-500  dark:bg-lightColor rounded-full border-none outline-none focus:border-none focus:outline-none focus:ring-0"
    value={selectedOption}
    onChange={handleOptionChange}
    
  >
    <option  className="bg-darkColor text-gray-500 dark:bg-lightColor rounded-full" value="">Filtrar</option>
    <option className="bg-darkColor text-white dark:text-black dark:bg-lightColor rounded-full" value="freemium">Freemium</option>
    <option className="bg-darkColor text-white dark:text-black dark:bg-lightColor rounded-full" value="premium">Premium</option>
    <option className="bg-darkColor text-white dark:text-black dark:bg-lightColor rounded-full" value="standard">Standard</option>
  </select>
  );
};

export default DropdownFilter;
