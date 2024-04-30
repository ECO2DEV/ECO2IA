import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Nav } from "./Nav";
import { useRouter } from "next/router";
import { ThemeToggle2, Avatar2 } from "../../shared/Header/Header";


export const Header = ({ children }) => {
  const [isActive, setIsActive] = useState(false);
  const { pathname } = useRouter();

  useEffect(() => {
    if (isActive) setIsActive(false);
  }, [pathname]);



  return (
    <>
      <div className="relative uppercase text-xs  z-[100]">
        <div
          onClick={() => {
            setIsActive(!isActive);
          }}
          className="fixed right-[20px] top-[16px] w-[45px] h-[45px] rounded-full bg-eco2MainColor flex flex-col items-center"
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
              className={`grow flex items-center justify-center btn`}
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
        <div className="fixed right-[20px] top-[50px] z-[100]">
          <div className="mt-8 rounded-full">
            <ThemeToggle2 />
          </div>
          <div className="mt-6 rounded-full">
            <Avatar2 />
          </div>
        </div>
    </>
  );
};
