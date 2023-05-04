import { useState, Fragment, useRef } from 'react';
import { DataNosIA } from '../../data/nosia';
import { Dialog, Transition } from '@headlessui/react';
import { createContactMessage } from '../../util/api/contact';
import { Toaster, toast } from 'react-hot-toast';

export const ContacUs = ({ onClose }) => {
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    company: '',
    telephone: '',
    message: ''
  });

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      toast.error('Please enter a valid email');
      return;
    }
    if (!formData.email) {
      toast.error('Please enter a valid email');
      return;
    }
    try {
      const response = await createContactMessage({ formData: formData });
      console.log(formData);
      if (response) {
        console.log('response', response);
        toast.success('Message sent successfully');
      }
      onClose();
    } catch (error) {
      toast.error('Something went wrong');
      console.log(error);
    }
  };

  return (
    <>
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-4 sm:w-full sm:max-w-lg lg:max-w-xl sm:p-6">
                  <div>
                    <div className="isolate bg-white">
                      <div
                        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
                        aria-hidden="true"
                      >
                        <div
                          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                          style={{
                            clipPath:
                              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
                          }}
                        />
                      </div>

                      <section className="pb-24 pt-16 sm:pb-32 sm:pt-24 lg:mx-auto lg:grid lg:max-w-7xl ">
                        <div className="px-6 lg:px-8">
                          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
                            <h2 className="text-5xl font-bold tracking-tight text-gray-900">
                              {' '}
                              {DataNosIA.NosIACONTACTFORMtitle}{' '}
                            </h2>
                            <p className="mt-2 text-lg leading-8 text-gray-600">
                              {DataNosIA.NosIACONTACTFORMdescription}
                            </p>
                            <form onSubmit={handleSubmit} className="mt-16">
                              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                                <div>
                                  <label
                                    htmlFor="name"
                                    className="block text-lg font-semibold leading-6 text-gray-900"
                                  >
                                    {DataNosIA.NosIACONTACTFORMname}
                                  </label>
                                  <div className="mt-2.5">
                                    <input
                                      onChange={(e) => handleContactChange(e)}
                                      type="text"
                                      name="name"
                                      id="name"
                                      autoComplete="given-name"
                                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <label
                                    htmlFor="lastName"
                                    className="block text-lg font-semibold leading-6 text-gray-900"
                                  >
                                    {DataNosIA.NosIACONTACTFORMlastname}
                                  </label>
                                  <div className="mt-2.5">
                                    <input
                                      onChange={(e) => handleContactChange(e)}
                                      type="text"
                                      name="lastName"
                                      id="lastName"
                                      autoComplete="family-name"
                                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                  </div>
                                </div>
                                <div className="sm:col-span-2">
                                  <label
                                    htmlFor="email"
                                    className="block text-lg font-semibold leading-6 text-gray-900"
                                  >
                                    {DataNosIA.NosIACONTACTFORMemail}
                                  </label>
                                  <div className="mt-2.5">
                                    <input
                                      onChange={(e) => handleContactChange(e)}
                                      id="email"
                                      name="email"
                                      type="email"
                                      autoComplete="email"
                                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                  </div>
                                </div>
                                <div className="sm:col-span-2">
                                  <label
                                    htmlFor="company"
                                    className="block text-lg font-semibold leading-6 text-gray-900"
                                  >
                                    {DataNosIA.NosIACONTACTFORMcompany}
                                  </label>
                                  <div className="mt-2.5">
                                    <input
                                      onChange={(e) => handleContactChange(e)}
                                      type="text"
                                      name="company"
                                      id="company"
                                      autoComplete="organization"
                                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                  </div>
                                </div>
                                <div className="sm:col-span-2">
                                  <div className="flex justify-between text-lg leading-6">
                                    <label
                                      htmlFor="telephone"
                                      className="block font-semibold text-gray-900"
                                    >
                                      {DataNosIA.NosIACONTACTFORMphone}
                                    </label>
                                    <p
                                      id="phone-description"
                                      className="text-gray-400 text-sm"
                                    >
                                      {DataNosIA.NosIACONTACTFORMoptional}
                                    </p>
                                  </div>
                                  <div className="mt-2.5">
                                    <input
                                      onChange={(e) => handleContactChange(e)}
                                      type="number"
                                      name="telephone"
                                      id="telephone"
                                      autoComplete="tel"
                                      aria-describedby="phone-description"
                                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                  </div>
                                </div>
                                <div className="sm:col-span-2">
                                  <div className="flex justify-between text-sm leading-6">
                                    <label
                                      htmlFor="message"
                                      className="block text-lg font-semibold leading-6 text-gray-900"
                                    >
                                      {
                                        DataNosIA.NosIACONTACTFORMhowwecanhelpyou
                                      }
                                    </label>
                                    <p
                                      id="message-description"
                                      className="text-gray-400"
                                    >
                                      {DataNosIA.NosIACONTACTFORMcharacters}
                                    </p>
                                  </div>
                                  <div className="mt-2.5">
                                    <textarea
                                      onChange={(e) => handleContactChange(e)}
                                      id="message"
                                      name="message"
                                      rows={4}
                                      aria-describedby="message-description"
                                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                      defaultValue={''}
                                    />
                                  </div>
                                </div>
                                <fieldset className="sm:col-span-2"></fieldset>
                              </div>
                              <div className="mt-10 flex justify-end border-t border-gray-900/10 pt-8">
                                <button
                                  type="submit"
                                  className="rounded-md bg-gray-900 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                  {DataNosIA.NosIACONTACTFORMsendmessage}
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <Toaster position="top-center" />
    </>
  );
};
