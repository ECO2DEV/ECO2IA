import { Fragment, useEffect,  useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Popover, Transition } from "@headlessui/react";
import clsx from "clsx";
import {CloseIcon, ChevronDownIcon, SunIconHome, MoonIcon } from "../../icons/icons"
import { Container } from "../../Container";
import logoLight from "../../../public/logosColorNegro.png";
import logoDark from "../../../public/logosColorBlanco.png";



function MobileNavItem({ href, children }) {
  return (
    <li>
      <Popover.Button as={Link} href={href} className="block py-2">
        {children}
      </Popover.Button>
    </li>
  );
}

function MobileNavigation(props) {
  const { data: session } = useSession();
  // mt-1 mr-5
  return (
    <Popover {...props}>
      <Popover.Button className="group flex h-full  mr-5  items-center rounded-full bg-white/90 px-3 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20">
        Menu
        <ChevronDownIcon className="ml-1 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400" />
      </Popover.Button>
      <Transition.Root>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Popover.Overlay className="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-sm dark:bg-black/80" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-zinc-800"
          >
            <div className="flex flex-row-reverse items-center justify-between">
              <Popover.Button aria-label="Close menu" className="-m-1 p-1">
                <CloseIcon className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
              </Popover.Button>
              <h2 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Navegación
              </h2>
            </div>
            <nav className="mt-6">
              <ul className="-my-2 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-lightColor">
                <MobileNavItem href="/">Home</MobileNavItem>
                <MobileNavItem href="/about">About</MobileNavItem>
                <MobileNavItem href="/contact-us">Contactanos</MobileNavItem>

                {session ? (
                  <MobileNavItem href="/dashboard">Dashboard</MobileNavItem>
                ) : (
                  <>
                    <MobileNavItem href="/auth/signin">Login</MobileNavItem>
                  </>
                )}
              </ul>
            </nav>
          </Popover.Panel>
        </Transition.Child>
      </Transition.Root>
    </Popover>
  );
}

function NavItem({ href, children }) {
  let isActive = usePathname() === href;

  return (
    <li>
      <Link
        href={href}
        className={clsx(
          "relative flex px-3 py-2 transition",
          isActive
            ? "text-eco2MainColor dark:text-eco2MainColor"
            : "hover:text-eco2MainColor dark:hover:text-eco2MainColor"
        )}
      >
        {children}
        {isActive && (
          <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0 dark:from-teal-400/0 dark:via-teal-400/40 dark:to-teal-400/0" />
        )}
      </Link>
    </li>
  );
}

function DesktopNavigation(props) {
  const { data: session } = useSession();

  return (
    <nav {...props}>
      <ul className="flex ml-15 mr-16  mx-auto rounded-full bg-white/90  text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
        <NavItem href="/">Home</NavItem>
        <NavItem href="/about">About</NavItem>
        <NavItem href="/contact-us">Contactanos</NavItem>
        {session ? (
          <NavItem href="/dashboard">Dashboard</NavItem>
        ) : (
          <>
            <NavItem href="/auth/signin">Login</NavItem>
          </>
        )}
      </ul>
    </nav>
  );
}

export function ThemeToggle() {
  let { resolvedTheme, setTheme } = useTheme();
  let otherTheme = resolvedTheme === "dark" ? "light" : "dark";
  let [mounted, setMounted] = useState(false);


  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      type="button"
      title="Click para cambiar el tema !"
      aria-label={mounted ? `Switch to ${otherTheme} theme` : "Toggle theme"}
      className="group flex items-center rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
      onClick={() => setTheme(otherTheme)}
    >
      <SunIconHome className="h-6 w-6 fill-zinc-100 stroke-zinc-900 transition group-hover:fill-zinc-100 group-hover:stroke-zinc-900 dark:hidden [@media(prefers-color-scheme:dark)]:fill-teal-50 [@media(prefers-color-scheme:dark)]:stroke-eco2MainColor [@media(prefers-color-scheme:dark)]:group-hover:fill-teal-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-eco2MainColor" />
      <MoonIcon className="hidden h-6 w-6 fill-zinc-700 stroke-zinc-500 transition dark:block [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-200 [@media_not_(prefers-color-scheme:dark)]:fill-eco2MainColor [@media_not_(prefers-color-scheme:dark)]:stroke-eco2MainColor" />
    </button>
  );
}


function AvatarContainer({ className, ...props }) {
  return <div className={clsx(className)} {...props} />;
}

function Avatar({ large = false, className, ...props }) {
  const { resolvedTheme} = useTheme()
  return (
    <Link
      href="/"
      aria-label="Home"
      className={clsx(className, "pointer-events-auto group flex items-center")}
      {...props}
    >
      <Image
        src={resolvedTheme === "dark"? logoDark :logoLight }
        alt="Logo Maria inteligencia"
        width={120}
        height={120}
        className={clsx(
          "rounded-full  object-cover "
        )}
        priority
      />
    </Link>
  );
}


export const Header = () => {
  return (
    <>
      <header className="z-50 flex flex-none flex-col sticky top-0">
        <div className="top-0 z-10 h-16 pt-6">
          <Container>
            <div className="flex justify-start">
              <AvatarContainer />
              <Avatar
              
              />
              <div className="flex flex-1" />
              <div className="flex flex-1 justify-end md:justify-center">
                <MobileNavigation className="pointer-events-auto md:hidden" />
                <DesktopNavigation className="pointer-events-auto hidden md:block" />
              </div>
              <div className="flex justify-end md:flex-1">
                <div className="pointer-events-auto">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </Container>
        </div>
      </header>
  
    </>
  );
};


export function Avatar2({ large = false, className, ...props }) {
  return (
    <Link
      href="/"
      aria-label="Home"
      className={clsx(className, "pointer-events-auto group flex items-center")}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="#ffff"
        className="group w-[45px] h-[45px] flex items-center rounded-full bg-zinc-800 dark:fill-black dark:bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:ring-white/10 dark:hover:ring-white/20"
        // className="icon icon-tabler icons-tabler-filled icon-tabler-home rounded-full max-h-10 max-w-12 bg-zinc-100 object-cover dark:bg-zinc-800"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12.707 2.293l9 9c.63 .63 .184 1.707 -.707 1.707h-1v6a3 3 0 0 1 -3 3h-1v-7a3 3 0 0 0 -2.824 -2.995l-.176 -.005h-2a3 3 0 0 0 -3 3v7h-1a3 3 0 0 1 -3 -3v-6h-1c-.89 0 -1.337 -1.077 -.707 -1.707l9 -9a1 1 0 0 1 1.414 0m.293 11.707a1 1 0 0 1 1 1v7h-4v-7a1 1 0 0 1 .883 -.993l.117 -.007z" />
      </svg>
    </Link>
  );
}


export function ThemeToggle2() {
  let { resolvedTheme, setTheme } = useTheme();
  let otherTheme = resolvedTheme === "dark" ? "light" : "dark";
  let [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      type="button"
      title="Click para cambiar el tema !"
      aria-label={mounted ? `Switch to ${otherTheme} theme` : "Toggle theme"}
      className="group w-[45px] h-[45px] flex items-center rounded-full bg-zinc-800 dark:bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:ring-white/10 dark:hover:ring-white/20"
      onClick={() => setTheme(otherTheme)}
    >
      <SunIconHome className="h-6 w-6   fill-slate-800 stroke-zinc-900 transition group-hover:fill-slate-800 group-hover:stroke-zinc-900 dark:hidden [@media(prefers-color-scheme:dark)]:fill-slate-800 [@media(prefers-color-scheme:dark)]:stroke-eco2MainColor [@media(prefers-color-scheme:dark)]:group-hover:fill-slate-800 [@media(prefers-color-scheme:dark)]:group-hover:stroke-eco2MainColor" />
      <MoonIcon className="hidden h-6 w-6   fill-eco2MainColor stroke-eco2MainColor transition dark:block [@media(prefers-color-scheme:dark)]:group-hover:stroke-eco2MainColor [@media_not_(prefers-color-scheme:dark)]:fill-eco2MainColor [@media_not_(prefers-color-scheme:dark)]:stroke-eco2MainColor" />
    </button>
  );
}
