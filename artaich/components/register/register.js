import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import Textbox from './textboxt';
import DropDownText from './dropdowntextboxt';
import DropdownCountry from './dropdownCountry';
import { createUser } from '../../util/api/user';
import { signIn } from 'next-auth/react';

export default function Register({ onClose }) {
  const [open, setOpen] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    Name: '',
    LastName: '',
    numberTelephone: ''
  });

  const cancelButtonRef = useRef(null);

  const handleUsernameChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createUser(formData);
      if (response.status == 200) {
        // SignIn after successfully acccount creation
        await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: true,
          callbackUrl: '/dashboard'
          //maxAge: 300
        });
      } else {
        //Something went wrong
        setError(response.message);
      }
    } catch (error) {
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
                      Création d'utilisateur
                    </Dialog.Title>
                  </div>
                  <div className="mt-2">
                    <form>
                      <Textbox
                        id={'username'}
                        nametx={'username'}
                        placeholder={'JaneSmith22'}
                        libelle={'Nom Utilisateur'}
                        type={'text'}
                        onChange={(e) => handleUsernameChange(e)}
                        value={formData.username}
                      />
                      <Textbox
                        id={'email'}
                        nametx={'email'}
                        placeholder={'JaneSmith22@mattech.com'}
                        libelle={'Email'}
                        type={'email'}
                        onChange={(e) => handleUsernameChange(e)}
                        value={formData.email}
                      />
                      <Textbox
                        id={'password'}
                        nametx={'password'}
                        placeholder={'*******'}
                        libelle={'Password'}
                        type={'password'}
                        onChange={(e) => handleUsernameChange(e)}
                        value={formData.password}
                      />
                      <Textbox
                        id={'LastName'}
                        nametx={'LastName'}
                        placeholder={'Jane Lauren'}
                        libelle={'Nom'}
                        type={'text'}
                        onChange={(e) => handleUsernameChange(e)}
                        value={formData.Lastname}
                      />
                      <Textbox
                        id={'Name'}
                        nametx={'Name'}
                        placeholder={'Smith'}
                        libelle={'Prenom'}
                        type={'text'}
                        onChange={(e) => handleUsernameChange(e)}
                        value={formData.Name}
                      />
                      <DropDownText
                        id={'numberTelephone'}
                        nametx={'numberTelephone'}
                        placeholder={'+33 06 98 66 91'}
                        libelle={'Numéro de Télephone'}
                        type={'text'}
                        onChange={(e) => handleUsernameChange(e)}
                        value={formData.num_tel}
                      />
                      <DropdownCountry />
                    </form>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    onClick={handleSubmit}
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
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
  // <div className="fixed inset-0 z-10 overflow-y-auto">
  //     <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
  //         <Transition.Child
  //             as={Fragment}
  //             enter="ease-out duration-300"
  //             enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
  //             enterTo="opacity-100 translate-y-0 sm:scale-100"
  //             leave="ease-in duration-200"
  //             leaveFrom="opacity-100 translate-y-0 sm:scale-100"
  //             leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
  //         >
  //             <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
  //                 <div>
  //                     <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-900">
  //                         <UserPlusIcon className="h-6 w-6  text-white" aria-hidden="true" />
  //                     </div>
  //                     <div className="mt-2 text-center sm:mt-2">
  //                         <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
  //                             Création d'utilisateur
  //                         </Dialog.Title>

  //                     </div>
  //                     <div className="mt-2">
  //                         <form>
  //                             <Textbox id={'username'} nametx={'username'} placeholder={'JaneSmith22'} libelle={'Nom Utilisateur'} type={'text'} onChange={e => handleUsernameChange(e)} value={formData.username} />
  //                             <Textbox id={'email'} nametx={'email'} placeholder={'JaneSmith22@mattech.com'} libelle={'Email'} type={'email'} onChange={e => handleUsernameChange(e)} value={formData.email} />
  //                             <Textbox id={'password'} nametx={'password'} placeholder={'*******'} libelle={'Password'} type={'password'} onChange={e => handleUsernameChange(e)} value={formData.password} />
  //                             <Textbox id={'LastName'} nametx={'LastName'} placeholder={'Jane Lauren'} libelle={'Nom'} type={'text'} onChange={e => handleUsernameChange(e)} value={formData.lastname} />
  //                             <Textbox id={'Name'} nametx={'Name'} placeholder={'Smith'} libelle={'Prenom'} type={'text'} onChange={e => handleUsernameChange(e)} value={formData.name} />
  //                             <DropDownText id={'numberTelephone'} nametx={'numberTelephone'} placeholder={'+33 06 98 66 91'} libelle={'Numéro de Télephone'} type={'text'} onChange={e => handleUsernameChange(e)} value={formData.num_tel} />
  //                             <DropdownCountry />
  //                         </form>
  //                     </div>
  //                 </div>
  //                 <div className='mt-1'>
  //                     {error && <span className='text-red-900'> {error}</span>}

  //                 </div>
  //                 <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
  //                     <button
  //                         type="button"
  //                         className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
  //                         onClick={handleSubmit}
  //                     >
  //                         Créer
  //                     </button>
  //                     <button
  //                         type="button"
  //                         className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
  //                         onClick={onClose}
  //                         ref={cancelButtonRef}
  //                     >
  //                         Cancel
  //                     </button>
  //                 </div>
  //             </Dialog.Panel>
  //         </Transition.Child>
  //     </div>
  // </div>
  //         </Dialog>
  //     </Transition.Root>
  // )
}
