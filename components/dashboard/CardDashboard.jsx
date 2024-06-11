import { useContext, useState } from 'react';
import Link from 'next/link';
import { BlockIANavigation } from '../icons/icons';
import { PromptContext } from '../../context/prompts/PromptContext';
import { motion } from 'framer-motion';
import { useHover } from '@uidotdev/usehooks';
import { StarsButton } from '../modal/StarsButton';
import { FramerModal } from '../modal/FramerModal';
import { classNames } from '../../constants/constans';
import { PopUpModal } from '../modal/popUpModal';

const planStatus = {
  Premium: 'text-amber-700 bg-amber-50 ring-amber-600/20',
  Freemium: 'text-gray-600 bg-gray-50 ring-gray-500/10',
  Standard: 'text-green-700 bg-green-50 ring-green-600/10',
  Enterprise: 'text-purple-700 bg-purple-50 ring-purple-600/20',
}


const CardDashboard = ({
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

  const { iasAllowedToAccess } = useContext(PromptContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleClose() {
    setIsModalOpen((prev) => !prev);
  }
  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: quantity * 0.1, duration: 0.3 }}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-xl border border-gray-900 dark:border-gray-100"
    >
      <div className="flex items-center gap-x-4 bg-darkHoverColor dark:bg-eco2HoverColor p-6">
        <img
          src={screenShoot}
          alt={title}
          className="h-12 w-12 flex-none rounded-lg object-cover ring-1 ring-gray-900/10"
        />
        <div className="flex flex-col justify-start items-start">
          <div className="text-lg  font-normal leading-6 text-white dark:text-black">
            {title}
          </div>
          <p className=" text-lightColor">
            Votos{' '}
            <span className="text-sm text-lightColor dark:text-eco2MainColor ">
              {score?.length}
            </span>
          </p>
        </div>

        <div className="flex items-center justify-end gap-5 opacity-50 z-10 ml-auto">
          <StarsButton
            title={title}
            score={score}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />

          {isModalOpen && (
            <PopUpModal isModalNeedIt={true} onClose={handleClose}>
              <FramerModal
                title={title}
                id_ia={id}
                modalOpen={isModalOpen}
                handleClose={handleClose}
                score={score}
              />
            </PopUpModal>
          )}
        </div>
      </div>
      <dl className="-my-3 divide-y divide-gray-800 dark:divide-gray-100 px-6 py-4 text-sm leading-6">
        <article className="flex justify-between gap-x-4 py-3">
          <dt className="text-gray-500">
            {plan?.typo === 'Premium' ? (
              <button
                title="Eres cliente Premium 😍"
                className="font-semibold uppercase text-darkHoverColor dark:text-amber-500 transition-all "
                disabled
              >
                Premium ✨
              </button>
            ) : (
              <Link
                title="Vuelvete cliente premium 😍"
                className="font-semibold uppercase hover:scale-110 text-lightColor dark:hover:text-amber-500 transition-all "
                href="/#pricing"
              >
                Upgrade⚡
              </Link>
            )}
          </dt>
          <dd className="flex items-start gap-x-2">
            
            <div
              className={classNames(
                planStatus[plan?.typo],
                'rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset'
              )}
            >
              {plan?.typo}
            </div>
          </dd>
        </article>
        <article className="flex justify-between gap-x-4 py-3">
          <dt className="text-gray-500">Ir a {title} 👉</dt>
          <dd className="relative">
            {iasAllowedToAccess.includes(title) ? (
              <Link
                className="p-2 border-2 border-darkColor group dark:border-lightColor  rounded-full absolute z-10 -top-1 right-0  cursor-pointer hover:scale-110 hover:bg-darkColor  duration-200 transition-all dark:hover:text-[#f5f5f7] duration-150 "
                href={href}
                target="_blank"
                rel="noreferrer"
                title={`Ir a ${title} ✨`}
              >
                <svg
                  className="h-3 w-3 text-black dark:text-white group-hover:text-eco2MainColor"
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
                className="bg-red-800 p-2 border-2  rounded-full absolute -top-1 right-0 hover:bg-red-600  duration-200 transition-all  duration-150 "
              >
                <BlockIANavigation />
              </button>
            )}
          </dd>
        </article>

        <article className="flex justify-between gap-x-4 py-3">
          <dt className="text-gray-500">{description} </dt>
        </article>
        <article className="flex justify-between gap-x-4 py-3">
          <dt className="text-gray-500">{
            keywords.split(",").map((keyword, index) => (
              <span key={index} className="dark:text-gray-500 ">
                {' - '}{keyword}
              </span>
            ))
          } </dt>
        </article>
      </dl>
    </motion.li>
  );
};

export default CardDashboard;
