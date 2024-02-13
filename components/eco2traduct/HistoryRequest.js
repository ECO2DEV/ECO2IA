import { useContext, Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { DataHistory } from '../../data/history';
import { useEco2traduct } from '../../hooks/useEco2traduct';
import { UserContext } from '../../context/user/UserContext';
import { PromptContext } from '../../context/prompts/PromptContext';

export default function HistoryRequest({
  onClose,
  setResult,
  setSecondResult,
  setFromText
}) {
  const cancelButtonRef = useRef(null);

  const [open, setOpen] = useState(true);
  const { user } = useContext(UserContext);
  const { setPrompt } = useContext(PromptContext);
  const { data: translationsData } = useEco2traduct(user?.id);

  const handleModalHistory = ({ lang1, lang2, fromText }) => {
    setResult(lang1);
    setSecondResult(lang2);
    setPrompt(fromText);
    onClose(); // close the modal
    // console.log('lang1 is:', fromText, lang1, lang2);
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mt-2 text-center">
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-semibold leading-6 text-gray-900"
                    >
                      {DataHistory.History}
                    </Dialog.Title>
                  </div>
                  <section className="bg-white">
                    <div className="flex justify-center items-center">
                      <div className="mt-10">
                        <dl className="space-y-1 text-justify ">
                          {translationsData?.data?.map((translate) => (
                            <div
                              key={translate.id}
                              className="border border-gray-800 p-2 rounded-md max-w-2xl cursor-pointer hover:opacity-80"
                              onClick={() =>
                                handleModalHistory({
                                  lang1:
                                    translate?.attributes?.payload_out?.lang1,
                                  lang2:
                                    translate?.attributes?.payload_out?.lang2,
                                  fromText:
                                    translate?.attributes?.payload_in?.prompt
                                })
                              }
                            >
                              <dt className="text-base font-semibold leading-7 text-gray-900">
                                {
                                  translate?.attributes?.payload_in
                                    ?.fromLanguage
                                }
                                {' ⇢ '}
                                {translate?.attributes?.payload_in?.toLanguage}
                                {' ⇢ '}
                                {
                                  translate?.attributes?.payload_in
                                    ?.toThirdLanguage
                                }
                              </dt>
                              <dd className="mt-1 text-sm font-[500] leading-4 text-gray-800">
                                {translate?.attributes?.payload_in?.prompt}
                              </dd>
                              <dd className="mt-1 text-sm font-[400] leading-4 text-gray-700">
                                {translate?.attributes?.payload_out?.lang1}
                              </dd>
                              <dd className="mt-1 text-sm font-[340] leading-4 text-gray-600">
                                {translate?.attributes?.payload_out?.lang2}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    </div>
                  </section>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
