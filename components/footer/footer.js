import { DataNavbar } from "../../data/navbar"
import { LinkedinIcon } from "../icons/icons"
const navigation = {
    main: [
      { name:  '', href: '#' },
      { name: DataNavbar.menu_opt_2, href: '/nosia' },
      { name: DataNavbar.menu_opt_3, href: '/#pricing' },
      { name: DataNavbar.menu_opt_4, href: '/about' },
      { name: DataNavbar.login_option, href: '/auth/signin' },
    ],
    social: [
      {
        name: 'Linkedin',  // Solo dejarás el enlace de LinkedIn
        href: 'https://www.linkedin.com/in/mattech-france-191ab4275/',  // Reemplaza con tu enlace de LinkedIn
        icon: LinkedinIcon,  // Utiliza tu componente de ícono de LinkedIn aquí
      },
    ],
  }
  
  export default function Footer() {
    return (
      <footer className="">
        <div className="mx-auto max-w-7xl overflow-hidden py-20 px-6 sm:py-24 lg:px-8">
          <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
            {navigation.main.map((item) => (
              <div key={item.name} className="pb-6">
                <a href={item.href} className="text-sm leading-6 text-white hover:text-gray-300">
                  {item.name}
                </a>
              </div>
            ))}
          </nav>
          <div className="mt-10 flex justify-center space-x-10">
            {navigation.social.map((item) => (
              <a key={item.name} href={item.href} className="text-white hover:text-gray-300">
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="mt-10 text-center text-xs leading-5 text-gray-500">
            &copy; 2023 Votre entreprise. Tous les droits sont réservés.
          </p>
        </div>
      </footer>
    )
  }