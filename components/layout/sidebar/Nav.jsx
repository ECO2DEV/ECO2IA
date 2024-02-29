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
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { ThemeToggle } from '../../shared/Header/Header';

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
  ,
];
export const Nav = ({ children }) => {
  const { pathname } = useRouter();
  const [selectedIndicator, setSelectedIndicator] = useState(pathname);
  const image_url = children?.props?.user?.avatar
    ?  children.props.user.avatar.url
    : '/empty_avatar.webp';

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
             
              <div>
                {image_url ? (
                  <Image
                    className="inline-block rounded-full "
                    src={image_url}
                    alt={children?.props?.user?.username}
                    width={80}
                    height={80}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-white bg-gray-400 rounded-full">
                    <span className="text-lg font-semibold">
                      {children.props.user.username.charAt(0)}
                      {children.props.user.username.charAt(1)}
                    </span>
                  </div>
                )}
              </div>
              <div className="ml-3 flex flex-col gap-1">
                <p className="text-sm font-medium text-white text-left text-lightColor dark:text-darkColor">
                  {children?.props?.user?.username}
                </p>
                <Link href={'/profile'}>
                  <p className="text-sm font-medium text-lightColor dark:text-darkColor group-hover:text-gray-300 text-left">
                    Mi perfil
                  </p>
                </Link>
              </div>
              <div className='flex justify-center mx-auto pl-5 md:pl-0 gap-2 '>
                   <button
                title="Click para cerrar sessión !"
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full text-left flex justify-center"
                onClick={() => signOut({ callbackUrl: '/' })}
              >
                <ArrowLeftOnRectangleIcon
                  className="h-5 w-5"
                  aria-hidden="true"
                />
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
              ></LinkComponent>
            );
          })}
          <Footer />
        </div>
      </div>
      <Curve />
    </motion.aside>
  );
};
