import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import { motion } from 'framer-motion';
import { menuSlide } from '../../../util/animate/Anim';
import { LinkComponent } from './LinkComponent';
import { Curve } from '../../../util/animate/Curve';
import Footer from './Footer';
import { ArrowLeftIcon, EmptyAvatar } from '../../icons/icons';
import { ThemeToggle } from '../../shared/Header/Header';
import { useSession } from 'next-auth/react';
const navItems = [
  {
    title: 'Inicio',
    href: '/'
  },
  {
    title: 'Dashboard',
    href: '/dashboard'
  },
  {
    title: 'Perfil',
    href: '/profile'
  },
  {
    title: 'Servicios',
    href: '/about'
  }
];
export const Nav = ({ children }) => {


  const { pathname } = useRouter();
  const [selectedIndicator, setSelectedIndicator] = useState(pathname);
  const { data: session } = useSession();

  const image_url = children?.props?.user?.avatar ? (
    <Image
      className="inline-block rounded-full "
      src={children.props.user.avatar.url}
      alt={children?.props?.user?.username}
      width={80}
      height={80}
    />
  ) : session?.picture ? (
    <Image
      className="inline-block rounded-full "
      src={session.picture}
      alt={children?.props?.user?.username}
      width={80}
      height={80}
    />
  ) : (
    <EmptyAvatar className="w-14 h-w-14 dark:text-gray-900 text-lightColor text-center" />
  );

  return (
    <motion.aside
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className="h-screen  fixed right-0 top-0 z-40 dark:bg-lightColor bg-darkBgCard "
    >
      <div className="p-20 h-full">
        <div
          onMouseLeave={() => {
            setSelectedIndicator(pathname);
          }}
          className="flex flex-col justify-between h-full  text-4xl font-bold"
        >
          <article className="flex flex-shrink-0 ">
            <div className="flex flex-wrap justify-center items-center gap-4">
              <div>{image_url}</div>
              <div className="ml-3 flex flex-col gap-1">
                <p className="text-sm font-medium text-white text-center text-lightColor dark:text-darkColor">
                  {children?.props?.user?.Name}
                </p>
                <Link href={'/profile'}>
                  <p className="rounded dark:bg-white/10 px-2 py-1 text-sm font-semibold text-white shadow-sm dark:hover:bg-white/20 dark:text-darkColor ring-1 ring-inset ring-gray-300 hover:scale-110 transition hover:opacity-95">
                    Mi perfil
                  </p>
                </Link>
              </div>
              <div className="flex justify-center mx-auto pl-5 md:pl-0 gap-2 ">
                <button
                  title="Click para cerrar sessión !"
                  className="bg-red-500 hover:bg-red-600 hover:scale-110 transition text-white font-bold py-2 px-4 rounded-full text-left flex justify-center"
                  onClick={() => signOut({ callbackUrl: '/' })}
                >
                  <ArrowLeftIcon className="h-6 w-6 " />
                </button>
                <ThemeToggle />
              </div>
            </div>
          </article>
          {navItems.map((data, index) => {
            return (
              <LinkComponent
                key={index}
                data={{ ...data, index }}
                isActive={selectedIndicator == data.href}
                setSelectedIndicator={setSelectedIndicator}
              />
            );
          })}
          <Footer />
        </div>
      </div>
      <Curve />
    </motion.aside>
  );
};
