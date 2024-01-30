export default function Textbox({id,libelle,nametx,type,placeholder, onChange, value}) {
    return(
        <div className="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
        <label htmlFor={nametx} className="block text-xs font-medium text-gray-900">
            {libelle}
        </label>
        <input
            type={type}
            name={nametx}
            id={id}
            className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder={placeholder}
            onChange={onChange}
            value={value}
        />
    </div>
    )
};
