import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import { motion } from 'framer-motion';
import { menuSlide } from '../../../util/animate/Anim';
import { LinkComponent } from './LinkComponent';
import { Curve } from '../../../util/animate/Curve';
import Footer from './Footer';
import { strapiUrl } from '../../../constants/constans';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
const navItems = [
  {
    title: 'Home',
    href: '/'
  },
  {
    title: 'Dashboard',
    href: '/dashboard'
  },
  {
    title: 'Profile',
    href: '/profile'
  },
  ,
];
export const Nav = ({ children }) => {
  const { pathname } = useRouter();
  const [selectedIndicator, setSelectedIndicator] = useState(pathname);
  const image_url = children?.props?.user?.avatar
    ? strapiUrl + children.props.user.avatar.url
    : '/empty_avatar.webp';

  return (
    <motion.aside
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className="h-screen bg-[#292929] fixed right-0 top-0 z-40"
    >
      <div className="p-20 h-full">
        <div
          onMouseLeave={() => {
            setSelectedIndicator(pathname);
          }}
          className="flex flex-col justify-between h-full text-5xl gap-2"
        >
          <article className="flex flex-shrink-0 ">
            <div className="flex items-center">
              <div>
                {image_url ? (
                  <img
                    className="inline-block h-20 w-20 rounded-full"
                    src={image_url}
                    alt={children?.props?.user?.username}
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
                <p className="text-sm font-medium text-white text-left">
                  {children?.props?.user?.username}
                </p>
                <Link href={'/profile'}>
                  <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300 text-left">
                    Mi perfil
                  </p>
                </Link>
                 <button
                title="Click for Logout !"
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full text-left flex justify-center"
                onClick={() => signOut({ callbackUrl: '/' })}
              >
                <ArrowLeftOnRectangleIcon
                  className="h-5 w-5"
                  aria-hidden="true"
                />
              </button>
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
