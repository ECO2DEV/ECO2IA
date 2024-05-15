import { useState, useEffect } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import DropdownFilter from './DropdownFilter';

export const Search = ({ iaCards, setFilterData }) => {
  // console.log("iarCards", iaCards)
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const [selectedOption, setSelectedOption] = useState('');



  function handleSearch(e) {
    setSearch(e.target.value);
  }
  useEffect(() => {
    const filteredData = iaCards.filter((ia) => {
      const isTitleMatch = ia.attributes.title
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase());
      const isKeywordMatch = ia.attributes.keywords
        .split(',')
        .some((keyword) => {
          return keyword
            .trim()
            .toLowerCase()
            .includes(debouncedSearch.toLowerCase());
        });
      const isTagMatch = ia.attributes.tags
        .split(',')
        .some(
          (tag) => tag.trim().toLowerCase() === selectedOption.toLowerCase()
        );

    

    // si escogemos una opción, filtrar por ella, si escogimos opcion y escribimos, filtrar por ambas, 
    // si escogimos solo escribir, filtrar por escribir

      if (selectedOption && debouncedSearch) {
        return isTitleMatch && isKeywordMatch && isTagMatch;
      } else if (selectedOption) {
        return isTagMatch;
      } else {
        return isTitleMatch || isKeywordMatch;
      }
    });

    setFilterData(filteredData);

    // Restaurar los datos originales al desmontar el componente
    return () => {
      setFilterData(iaCards);
    };
  }, [debouncedSearch, selectedOption, iaCards, setFilterData]);

  return (
    <div className="flex justify-center items-center gap-4">
      <DropdownFilter
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
      <div className="flex rounded-md shadow-sm w-96">
        <div className="relative flex flex-grow items-stretch focus-within:z-10">
          <input
            value={search}
            autoComplete="off"
            aria-autocomplete="none"
            onChange={handleSearch}
            type="text"
            name="search"
            id="search"
            className="pr-10 bg-darkHoverColor text-white dark:text-black dark:bg-lightColor rounded-full border-none outline-none focus:border-none focus:outline-none focus:ring-0 w-full"
            placeholder=" Deporte, Copys, Diseño..."
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <MagnifyingGlassIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
