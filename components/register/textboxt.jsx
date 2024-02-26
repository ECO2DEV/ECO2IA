export default function Textbox({ id, libelle, nametx, type, placeholder, onChange, value }) {
    return (
        <div className="relative z-0 w-full mb-5 group">
            <label
                htmlFor="floating_email"
                className="peer-focus:font-medium text-eco2MainColor absolute text-xl leading-6 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-eco2MainColor peer-focus:dark:text-eco2MainColor peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
                {libelle}
            </label>
            <input
                type={type}
                name={nametx}
                id={id}
                className="block py-2.5 px-0 w-full text-sm bg-transparent text-white border-0 border-b-2 dark:border-emerald-600 dark:focus:border-eco2MainColor focus:outline-none focus:ring-0 focus:border-eco2MainColor peer"
                placeholder=" "
                onChange={onChange}
                value={value}
            />
        </div>
    )
};
