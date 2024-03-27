import { useState } from 'react';

import Link from 'next/link';
import { useHover } from '@uidotdev/usehooks'
import { motion, AnimatePresence } from 'framer-motion'
import { StarsButton } from '../modal/StarsButton';
import { FramerModal } from '../modal/FramerModal';

const IACard = ({
  id,
  title,
  description,
  href,
  screenShoot,
  keywords,
  quantity,
  score,
  index,
  plan
  
}) => {


  const [ref, hovering] = useHover();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // console.log('screenShoot?.data?.attributes?.url', screenShoot )

  // const { plan } = useContext(PromptContext);

  // console.log("aqui toy con el plan", plan)
  
    const iasAllowedToAccess =  plan?.ias_access?.split(',')
    const iasAllowedToAccessClean = iasAllowedToAccess.map((ia) => ia.trim());

  const arrKeywords = keywords.split(',');
  let urlImg = screenShoot || '/empty_image.webp';
  
  return (
    <motion.article
      key={id}
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: quantity * 0.1, duration: 0.3 }}
      viewport={{ once: true }}
      className={`relative flex flex-col rounded-3xl bg-eco2HoverColor p-6 gap-3 border-2  overflow-hidden col-span-8 row-span-1 sm:row-span-2 md:row-span-3  dark:bg-darkBgCard md:p-8  ${
        index % 2 === 0
          ? 'md:row-span-4 lg:col-span-4'
          : 'md:row-span-3 lg:col-span-4'
      }`}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-start gap-5 opacity-50 z-[1]">
          <StarsButton
            title={title}
            score={score}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />

          <AnimatePresence
            initial={false}
            wait={true}
            onExitComplete={() => null}
          >
            {isModalOpen && (
              <FramerModal
                title={title}
                id_ia={id}
                modalOpen={isModalOpen}
                handleClose={() => setIsModalOpen((prev) => !prev)}
                score={score}
              />
            )}
          </AnimatePresence>

          <p className="font-semibold uppercase">
            Votos{' '}
            <span className="text-slate-950 dark:text-eco2MainColor text-lg font-semibold">
              {' '}
              {score?.length}
            </span>
          </p>
              {
                plan.typo === 'Premium' ? (<button
            title="Eres cliente Premium 😍"
            className="font-semibold uppercase dark:text-amber-500 transition-all "
            disabled
          >
            Premium ✨
          </button>) : (
          <Link
            title="Vuelvete cliente premium 😍"
            className="font-semibold uppercase hover:scale-110 dark:hover:text-amber-500 transition-all "
            href="/#pricing"
          >
            Upgrade⚡
          </Link>)
              }
          
          {iasAllowedToAccessClean.includes(title) ? (
            <Link
              className="p-2 border-2 border-[#0b0a10] dark:border-[#f5f5f7]  rounded-full absolute z-50 top-4 right-6 lg:top-6 lg:right-8 cursor-pointer hover:scale-110 hover:bg-black hover:text-white duration-200 transition-all dark:hover:text-[#f5f5f7] duration-150 "
              href={href}
              target="_blank"
              rel="noreferrer"
              title={`Ir a ${title} 🤖`}
            >
              <svg
                className="h-6 w-6 dark:text-white hover:text-eco2MainColor"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
              </svg>
            </Link>
          ) : (
            <button
              title="No permitido para plan freemium 😔"
              disabled={true}
              className="bg-red-800 p-2 border-2  rounded-full absolute z-50 top-4 right-6 lg:top-6 lg:right-8  hover:bg-red-600  duration-200 transition-all  duration-150 "
            >
              <svg
                className="h-6 w-6 text-white "
                viewBox="0 0 219.328 219.328"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M185.726,30.746c-0.086-0.096-0.168-0.195-0.26-0.287c-0.198-0.198-0.406-0.381-0.62-0.552
              C165.201,11.377,138.738,0,109.666,0C49.198,0,0.003,49.196,0.003,109.668c0.002,29.059,11.369,55.51,29.884,75.152
              c0.177,0.224,0.365,0.441,0.572,0.647c0.107,0.106,0.22,0.2,0.331,0.299c19.957,20.679,47.94,33.562,78.877,33.562
              c60.466,0,109.659-49.193,109.659-109.661C219.325,78.707,206.427,50.706,185.726,30.746z M109.666,15
              c22.538,0,43.256,7.923,59.53,21.123L36.125,169.194c-13.198-16.273-21.12-36.991-21.122-59.527C15.003,57.468,57.469,15,109.666,15
              z M109.666,204.328c-24.269,0-46.432-9.186-63.204-24.258l133.61-133.609c15.07,16.772,24.253,38.936,24.253,63.206
              C204.325,161.863,161.861,204.328,109.666,204.328z"
                />
              </svg>
            </button>
          )}
        </div>

        <div className="flex flex-col gap-1 z-[1]">
          <h3
            className={`${isModalOpen ? 'opacity-5' : ''} text-2xl font-bold`}
          >
            {title}
          </h3>
          <p className={`${isModalOpen ? 'opacity-5' : ''} text-base `}>
            {description}
          </p>
          <div className="flex items-center gap-2 opacity-90 font-medium">
            {arrKeywords.map((keyword) => (
              <span
                key={keyword}
                className={`${isModalOpen ? 'opacity-5' : ''} text-sm`}
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
        <img
          className={`${
            isModalOpen ? 'opacity-10' : ''
          } absolute  -right-10 w-full top-48 rounded-2xl object-cover  transition-all duration-300 lg:-right-12 lg:top-48 ${
            hovering && 'scale-[1.025]'
          }`}
          src={urlImg}
          alt={title}
          title={title}
        />
      </div>
    </motion.article>
  );
};

export default IACard
