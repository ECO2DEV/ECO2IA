export default function Textbox({ id, libelle, nametx, type, placeholder, onChange, value }) {
    return (
        <div className="relative z-0 w-full mb-5 group">
            <label
                htmlFor="floating_email"
                className="absolute text-xl leading-6 dark:text-white -top-4"
            >
                {libelle}
            </label>
            <input
                type={type}
                name={nametx}
                id={id}
                className="block py-2.5 px-0 w-full text-sm bg-transparent dark:text-white border-0 border-b-2 dark:border-emerald-600 dark:focus:border-eco2MainColor focus:outline-none focus:ring-0 focus:border-eco2MainColor peer"
                placeholder=" "
                onChange={onChange}
                value={value}
            />
        </div>
    )
};
