import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Nav } from './Nav';
import { useRouter } from 'next/router';

export const Header = ({children}) => {
  const [isActive, setIsActive] = useState(false);
  const { pathname } = useRouter();

  useEffect(() => {
    if (isActive) setIsActive(false);
  }, [pathname]);

  return (
    <>
      <div className="text-[#99999] border uppercase text-xs ">
        <div
          onClick={() => {
            setIsActive(!isActive);
          }}
          className="fixed right-0 top-0 m-[20px] z-[100] w-[60px] h-[60px] rounded-[50%] bg-[#21c284] flex items-center justify-center cursor-pointer"
        >
          {isActive ? (
            <button
              onClick={() => setIsActive(!isActive)}
              className={`animate-pulse grow flex items-center justify-center btn btn2 pl-[6px]`}
            >
              <div></div>
              <div></div>
              <div></div>
            </button>
          ) : (
            <button
              onClick={() => setIsActive(!isActive)}
              className={`grow flex items-center justify-center btn `}
            >
              <div></div>
              <div></div>
              <div></div>
            </button>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isActive && <Nav children={children} />}
      </AnimatePresence>
    </>
  );
};
