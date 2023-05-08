import { useState, Fragment, useRef } from 'react';
import { useRouter } from 'next/router';
import { Dialog, Transition } from '@headlessui/react';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import { updateUserById } from '../../util/api/user';
import { toast } from 'react-hot-toast';

export default function EditProfile({ onClose, user }) {
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);
  const router = useRouter();

  const [formData, setFormData] = useState({
    Name: user.Name,
    LastName: user.LastName,
    email: user.email,
    numberTelephone: user.numberTelephone,
    country: user.country
    // about: ''
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.Name === '' ||
      formData.LastName === '' ||
      formData.email === '' ||
      formData.numberTelephone === '' ||
      formData.country === ''
      // || formData.about === ''
    ) {
      toast.error('Please fill all the fields');

      return;
    }

    if (
      formData.Name.length < 3 ||
      formData.Name.length > 50 ||
      formData.LastName.length < 3 ||
      formData.LastName.length > 50
    ) {
      toast.error('Name and Last Name must be between 3 and 50 characters');

      return;
    }
    // Valid email with regex
    if (!formData.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      toast.error('Please enter a valid email');

      return;
    }

    try {
      const response = await updateUserById({
        formData: formData,
        id: user.id
      });
      // console.log('Response:', response.data);
      toast.success('Profile updated');
      router.push('/profile');
      onClose();
    } catch (error) {
      toast.error('Error updating profile');
      console.error('Error:', error);
    }
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
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-900">
                    <UserPlusIcon
                      className="h-6 w-6  text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-2 text-center sm:mt-2">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Profile Edit
                    </Dialog.Title>
                  </div>
                  <div className="isolate bg-white px-6 pb-10 lg:px-8">
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

                    <form
                      onSubmit={handleSubmit}
                      className="mx-auto mt-10 max-w-xl"
                    >
                      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="Name"
                            className="block text-sm font-semibold leading-6 text-gray-900"
                          >
                            First name
                          </label>
                          <div className="mt-2.5">
                            <input
                              onChange={(e) => handleProfileChange(e)}
                              value={formData.Name}
                              type="text"
                              name="Name"
                              id="Name"
                              autoComplete="given-name"
                              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="LastName"
                            className="block text-sm font-semibold leading-6 text-gray-900"
                          >
                            Last name
                          </label>
                          <div className="mt-2.5">
                            <input
                              onChange={(e) => handleProfileChange(e)}
                              value={formData.LastName}
                              type="text"
                              name="LastName"
                              id="LastName"
                              autoComplete="family-name"
                              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="email"
                            className="block text-sm font-semibold leading-6 text-gray-900"
                          >
                            Email
                          </label>
                          <div className="mt-2.5">
                            <input
                              onChange={(e) => handleProfileChange(e)}
                              value={formData.email}
                              type="email"
                              name="email"
                              id="email"
                              autoComplete="email"
                              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="numberTelephone"
                            className="block text-sm font-semibold leading-6 text-gray-900"
                          >
                            Phone number
                          </label>

                          <input
                            onChange={(e) => handleProfileChange(e)}
                            value={formData.numberTelephone}
                            type="number"
                            name="numberTelephone"
                            id="numberTelephone"
                            autoComplete="tel"
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="country"
                            className="block text-sm font-semibold leading-6 text-gray-900"
                          >
                            Country
                          </label>
                          <div className="mt-2.5">
                            <input
                              onChange={(e) => handleProfileChange(e)}
                              value={formData.country}
                              type="text"
                              name="country"
                              id="country"
                              autoComplete="organization"
                              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        {/* <div className="sm:col-span-2">
                          <label
                            htmlFor="about"
                            className="block text-sm font-semibold leading-6 text-gray-900"
                          >
                            About
                          </label>
                          <div className="mt-2.5">
                            <textarea
                              onChange={(e) => handleProfileChange(e)}
                              value={formData.about}
                              name="about"
                              id="about"
                              rows={4}
                              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div> */}
                      </div>
                      <div className="pt-10 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                        <button
                          type="submit"
                          className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                        >
                          Créer
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                          onClick={onClose}
                          ref={cancelButtonRef}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
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
