import { DataHero } from "../../data/hero";
import Link from "next/link";

export default function Hero({ user }) {
  return (
    <section className="relative isolate px-6 lg:px-8 pb-48 lg:py-0">
      <div className="mx-auto max-w-3xl sm:py-46 lg:pb-48">
        <div className="text-center sm:mb-8 sm:flex sm:justify-center">
          <p className="text-lg leading-8 dark:text-zinc-100">
            {DataHero.hero_description}
          </p>
        </div>

        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl dark:text-zinc-100">
            {DataHero.hero_maintext}
          </h1>

          <div className="mt-8 relative rounded-full py-1 px-3 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            <Link href={"/about"} className="font-semibold text-indigo-600 dark:text-zinc-100">
              <span className="absolute inset-0" aria-hidden="true" />
              {DataHero.hero_readmore}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          <button className="mx-auto mt-8 relative border hover:border-emerald-600 duration-500 group cursor-pointer text-sky-50 overflow-hidden h-14 w-56 rounded-md bg-emerald-800 p-2 flex justify-center items-center font-extrabold">
            <div className="absolute z-10 w-48 h-48 rounded-full group-hover:scale-150 transition-all duration-500 ease-in-out bg-emerald-900 delay-150 group-hover:delay-75"></div>
            <div className="absolute z-10 w-40 h-40 rounded-full group-hover:scale-150 transition-all duration-500 ease-in-out bg-emerald-800 delay-150 group-hover:delay-100"></div>
            <div className="absolute z-10 w-32 h-32 rounded-full group-hover:scale-150 transition-all duration-500 ease-in-out bg-emerald-700 delay-150 group-hover:delay-150"></div>
            <div className="absolute z-10 w-24 h-24 rounded-full group-hover:scale-150 transition-all duration-500 ease-in-out bg-emerald-600 delay-150 group-hover:delay-200"></div>
            <div className="absolute z-10 w-16 h-16 rounded-full group-hover:scale-150 transition-all duration-500 ease-in-out bg-emerald-500 delay-150 group-hover:delay-300"></div>
            <Link
              href={user ? "/dashboard" : "/auth/signin"}
              className="z-10 bg-transparent"
            >
              {DataHero.hero_getstarted}
            </Link>
          </button>
        </div>
      </div>
    </section>
  );
}
