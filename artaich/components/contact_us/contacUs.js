import { useState } from 'react';
import { useRouter } from 'next/router';
import { DataNosIA } from '../../data/nosia';

import { createContactMessage, sendEmail } from '../../util/api/contact';
import { toast } from 'react-hot-toast';
import Loader from '../loader/loader';

export const ContacUs = ({ onClose = () => {} }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isNotHomepage = router.pathname !== '/';

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
    setLoading(true);
    if (
      formData.name === '' ||
      formData.lastName === '' ||
      formData.email === '' ||
      formData.telephone === '' ||
      formData.message === ''
    ) {
      toast.error('Please fill all the fields');
      setLoading(false);
      return;
    }

    if (
      formData.name.length < 3 ||
      formData.name.length > 50 ||
      formData.lastName.length < 3 ||
      formData.lastName.length > 50
    ) {
      toast.error('Name and Last Name must be between 3 and 50 characters');
      setLoading(false);
      return;
    }

    if (!formData.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      toast.error('Please enter a valid email');
      setLoading(false);
      return;
    }
    if (!formData.email) {
      toast.error('Please enter a valid email');
      setLoading(false);
      return;
    }

    try {
      const contactPromise = createContactMessage({ formData: formData });
      const emailPromise = sendEmail({ formData: formData });

      const [contactResponse, emailResponse] = await Promise.all([
        contactPromise,
        emailPromise
      ]);

      toast.success('Messages sent successfully');

      if (!isNotHomepage) {
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setTimeout(() => {
          router.reload();
        }, 1500);
      }

      console.log('This is the contact message', contactResponse);
      console.log('This is the email message', emailResponse);
    } catch (error) {
      toast.error('Something went wrong');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
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
                  <p id="phone-description" className="text-gray-400 text-sm">
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
                    {DataNosIA.NosIACONTACTFORMhowwecanhelpyou}
                  </label>
                  <p id="message-description" className="text-gray-400">
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
              {loading ? (
                <Loader />
              ) : (
                <button
                  type="submit"
                  className={`rounded-md bg-gray-900 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                >
                  {DataNosIA.NosIACONTACTFORMsendmessage}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
