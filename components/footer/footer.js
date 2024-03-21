import { LinkedinIcon } from "../icons/icons";
import { DataNavbar } from "../../data/navbar";
import LandingPage from "../modal/LandingPage";

const navigation = {
  main: [
    { name: DataNavbar.menu_opt_2, href: "/nosia" },
    { name: DataNavbar.menu_opt_3, href: "/#pricing" },
    { name: DataNavbar.menu_opt_4, href: '/about' },
    { name: DataNavbar.login_option, href: '/auth/signin' },
  ],
  social: [
    {
      name: "Linkedin",
      href: "https://www.linkedin.com/company/eco2it/",
      icon: LinkedinIcon,
    },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-lightColor dark:bg-darkColor">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <hr className="my-10 h-px bg-gray-600 border-0 dark:bg-gray-700" />

        <div className="py-12 overflow-hidden">
          <div className="flex justify-between">
            <div className="flex flex-col sm:flex-row sm:space-x-10">
              <img
                className={`h-20 w-20 animate-float img-filter-green dark:filter-none`}
                // !isDarkMode ? "img-filter-green" : "filter grayscale"
                //dark:img-filter-green
                //  filter grayscale
                src="https://eco2.com.co/moanooch/2021/09/Eco3.gif"
                alt="Eco2 Animation"
              />
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Ecosistema de IA's 🍃
                </h2>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Quiere ser parte de nuestro ecosistema de IA's ?
                </p>
                {/* <button
                  className="mt-3 inline-block rounded-md font-medium px text-white"
                > */}
                  <LandingPage />
                {/* </button> */}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-bold text-gray-600 dark:text-gray-300">
                  Legal
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a
                      href="/terminos"
                      className="text-sm text-gray-500 dark:text-gray-300 hover:underline"
                    >
                      Términos y Condiciones
                    </a>
                  </li>
                  <li>
                    <a
                      href="/privacidad"
                      className="text-sm text-gray-500 dark:text-gray-300 hover:underline"
                    >
                      Política de Privacidad
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-600 dark:text-gray-300">
                  Soporte
                </h3>
                <ul className="mt-4 space-y-4">
                  {navigation.main.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm text-gray-500 dark:text-gray-300 hover:underline"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-center space-x-6">
            {navigation.social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-500">
            &copy; 2023 Eco2 AI. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
