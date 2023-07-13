import { useContext, Fragment, useRef, useState } from 'react';
import Image from 'next/image';
import { Dialog, Transition } from '@headlessui/react';
import { UserContext } from '../../context/user/UserContext';
import { useChat } from '../../hooks/useChat';
import { strapiUrl } from '../../constants/constans';
import { DeleteIcon, ClipboardIcon, EmptyAvatar } from '../icons/icons';
import ModalDelete from './ModalDelete';
import { toast } from 'react-hot-toast';

export default function HistoryChat({ onClose }) {
  const cancelButtonRef = useRef(null);
  const [deleteId, setDeleteId] = useState(0);
  const [open, setOpen] = useState(true);
  const { user } = useContext(UserContext);
  const { data, deleteChat } = useChat(user?.id);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const onHandleModalDelete = (id) => {
    setDeleteModalOpen((prev) => !prev);
  };
  const handleCopy = (text, index) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success('Text copied to clipboard!');
      })
      .catch(() => {
        toast.error('Failed to copy text to clipboard!');
      });
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl  lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl p-6">
                <div>
                  <div className="mt-2 mb-4 text-center">
                    <Dialog.Title
                      as="h3"
                      className="text-3xl font-semibold leading-6 text-gray-900"
                    >
                      History
                    </Dialog.Title>
                  </div>
                  <div className="h-full bg-gray-100">
                    <section className="flex flex-col text-sm h-[80vh] lg:h-[85vh] overflow-y-scroll overflow-x-hidden">
                      {data?.data.length === 0 ? (
                        <p className="text-center text-2xl pt-4 text-gray-500">
                          No hay historial disponible.
                        </p>
                      ) : (
                        data?.data.map((item, index) => {
                          return (
                            <div key={item.id}>
                              <div
                                className={`group w-full text-gray-800 bg-gray-100 relative`}
                              >
                                <div className="flex p-4 gap-4 text-base md:gap-6 md:max-w-4xl lg:max-w-5xl md:py-6 lg:px-0 m-auto">
                                  <div className="flex-shrink-0 ml-2 flex flex-col relative items-end w-[30px]">
                                    {user?.avatar ? (
                                      <img
                                        className="w-7 h-7 rounded-full object-cover"
                                        src={strapiUrl + user.avatar.url}
                                        alt="user_avatar"
                                      />
                                    ) : (
                                      <EmptyAvatar />
                                    )}
                                  </div>
                                  <div className="relative flex flex-col text-left w-[calc(100%-50px)] gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
                                    {item.attributes.payload_in.prompt}
                                  </div>
                                </div>

                                <button
                                  onClick={() => {
                                    onHandleModalDelete(item.id);
                                    setDeleteId(item.id);
                                  }}
                                  className="absolute right-0 top-0 cursor-pointer "
                                >
                                  <DeleteIcon />
                                </button>
                              </div>

                              <div
                                className={`relative group w-full text-gray-100 border-b border-black/10 bg-gray-800 `}
                              >
                                <div className="flex p-4 gap-4 text-base md:gap-6 md:max-w-4xl lg:max-w-5xl  md:py-6 lg:px-0 m-auto">
                                  <div className="flex-shrink-0 ml-2 flex flex-col relative items-end w-[30px]">
                                    <Image
                                      src="/Mlogo.ico"
                                      alt="MatTech logo"
                                      width={30}
                                      height={30}
                                    />
                                  </div>
                                  <div className="flex flex-col text-justify w-[calc(100%-50px)] gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
                                    {item.attributes.payload_out.resp}
                                    <div className="absolute right-0 top-0 flex flex-col items-end ">
                                      <button
                                        className="p-1"
                                        onClick={() =>
                                          handleCopy(
                                            item.attributes.payload_out.resp,
                                            index
                                          )
                                        }
                                      >
                                        <div className="w-6 h-6 text-gray-100 bg-gray-100 transition duration-200 m-1 group-hover:bg-cyan-700 group-hover:text-black rounded-full ">
                                          <ClipboardIcon />
                                        </div>
                                      </button>
                                      {/* {copied[index] && (
                                        <div className=" bg-blue-900 text-white rounded">
                                          Copié dans le presse-papiers !
                                        </div>
                                      )} */}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </section>
                    {deleteModalOpen && (
                      <ModalDelete
                        onClose={onClose}
                        onHandleDelete={() => deleteChat(deleteId)}
                      />
                    )}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
