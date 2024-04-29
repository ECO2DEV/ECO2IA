import React, { useState } from 'react';
import {
  BuildingOffice2Icon,
  EnvelopeIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

import { createIAContactMessage } from '../util/api/iaContact';
import { DataNosIA } from '../data/nosia';
import { FileUpload } from '../components/files/FileUpload';

export default function contactUs() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    Email: '',
    ImageIAS: [],
    IADetail: ''
  });
  const [files, setFiles] = useState([]);

  const handleIAContactChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      formData.name === '' ||
      formData.Email === '' ||
      formData.IADetail === ''
    ) {
      toast.error(DataNosIA.NosIAPleaseFill);
      setLoading(false);
      return;
    }

    if (!formData.Email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      toast.error(DataNosIA.NosIAValidEmail);
      setLoading(false);
      return;
    }
    if (!formData.Email) {
      toast.error(DataNosIA.NosIAValidEmail);
      setLoading(false);
      return;
    }

    try {
      const formPayload = new FormData();

      formPayload.append('files', files[0], files[0].name);

      const response = await createIAContactMessage({
        formData: formData,
        formPayload: formPayload
      });

      console.log(response);
      if (response.status === 200) {
        toast.success(DataNosIA.NosIAMessageSent);

        setFormData({
          name: '',
          Email: '',
          ImageIAS: [],
          IADetail: ''
        });
        setFiles([]);
      } else {
        toast.error('Hubo un problema al enviar los datos.');
      }
    } catch (error) {
      console.error(error);
      toast.error(DataNosIA.NosIASomethingWrong);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className={`relative isolate bg-no-repeat aspect-video w-full bg-cover bg-center bg-[url('/bgLight.svg')] dark:bg-[url('/bgDark.svg')] -my-16`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        <section className="relative px-3 pb-5 pt-5 sm:pt-20 lg:static lg:px-8 lg:py-20">
          <header className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden ring-1 ring-white/5 lg:w-1/2">
              <svg
                className="absolute inset-0 h-full w-full stroke-gray-700 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="54f88622-e7f8-4f1d-aaf9-c2f5e46dd1f2"
                    width={200}
                    height={200}
                    x="100%"
                    y={-1}
                    patternUnits="userSpaceOnUse"
                  >
                    <path d="M130 200V.5M.5 .5H200" fill="none" />
                  </pattern>
                </defs>
                <svg
                  x="100%"
                  y={-1}
                  className="overflow-visible fill-gray-800/20"
                >
                  <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
                </svg>
                <rect
                  width="100%"
                  height="100%"
                  strokeWidth={0}
                  fill="url(#54f88622-e7f8-4f1d-aaf9-c2f5e46dd1f2)"
                />
              </svg>
              <div
                className="absolute -left-56 top-[calc(100%-13rem)] transform-gpu blur-3xl lg:left-[max(-14rem,calc(100%-59rem))] lg:top-[calc(50%-7rem)]"
                aria-hidden="true"
              >
                <div
                  className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-br from-[#80caff] to-[#4f46e5] opacity-20"
                  style={{
                    clipPath:
                      'polygon(74.1% 56.1%, 100% 38.6%, 97.5% 73.3%, 85.5% 100%, 80.7% 98.2%, 72.5% 67.7%, 60.2% 37.8%, 52.4% 32.2%, 47.5% 41.9%, 45.2% 65.8%, 27.5% 23.5%, 0.1% 35.4%, 17.9% 0.1%, 27.6% 23.5%, 76.1% 2.6%, 74.1% 56.1%)'
                  }}
                />
              </div>
            </div>
            <h2 className="text-3xl font-bold tracking-tight dark:text-white">
              Únete a ECO2 IA's 🍃
            </h2>
            <p className="mt-6 text-lg leading-8 dark:text-gray-300">
              Únete a nuestro ecosistema de IA y comparte tu inteligencia
              artificial con miles de usuarios. Completa el formulario y nos
              pondremos en contacto contigo.
            </p>
            <address className="mt-10 space-y-4 text-base leading-7 dark:text-gray-300">
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Address</span>
                  <BuildingOffice2Icon
                    className="h-7 w-6 dark:text-gray-400"
                    aria-hidden="true"
                  />
                </dt>
                <dd>
                  Ciudad Bogota
                  {/* <br /> */}
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Telephone</span>
                  <PhoneIcon
                    className="h-7 w-6 dark:text-gray-400"
                    aria-hidden="true"
                  />
                </dt>
                <dd>
                  <a
                    className="dark:hover:text-white"
                    href="tel:+57 316 8259610"
                  >
                    +57 316 8259610
                  </a>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Email</span>
                  <EnvelopeIcon
                    className="h-7 w-6 dark:text-gray-400"
                    aria-hidden="true"
                  />
                </dt>
                <dd>
                  <a
                    className="dark:hover:text-white"
                    href="mailto:hablemos@eco2.com.co"
                  >
                    hablemos@eco2.com.co
                  </a>
                </dd>
              </div>
            </address>
          </header>
        </section>
        <form
          onSubmit={handleSubmit}
          className="px-3 pb-5 pt-5 sm:pb-20 lg:px-8 lg:py-20"
        >
          <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold leading-6 dark:text-white"
                >
                  Nombre Completo
                </label>
                <div className="mt-2.5">
                  <input
                    onChange={(e) => handleIAContactChange(e)}
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    required
                    autoComplete="given-name"
                    className="block w-full rounded-md border-white custom-input bg-darkBgCard px-3.5 py-2 text-white shadow-sm ring-1 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold leading-6 dark:text-white"
                >
                  Correo Electronico
                </label>
                <div className="mt-2.5">
                  <input
                    onChange={(e) => handleIAContactChange(e)}
                    type="email"
                    name="Email"
                    id="Email"
                    value={formData.Email}
                    required
                    autoComplete="email"
                    className="block w-full rounded-md border-white custom-input bg-darkBgCard px-3.5 py-2 text-white shadow-sm sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  className="block text-sm font-semibold leading-6 dark:text-white"
                  htmlFor="ImageIAS"
                >
                  Imagenes
                </label>
                <FileUpload files={files} setFiles={setFiles} />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold leading-6 dark:text-white"
                >
                  Detalle de la IA
                </label>
                <div className="mt-2.5">
                  <textarea
                    onChange={(e) => handleIAContactChange(e)}
                    name="IADetail"
                    id="IADetail"
                    value={formData.IADetail}
                    required
                    rows={4}
                    className="block w-full rounded-md border-white custom-input bg-darkBgCard px-3.5 py-2 text-white shadow-sm ring-1 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <button
                disabled={loading}
                type="submit"
                className="rounded-md bg-eco2MainColor px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-darkHoverColor dark:hover:bg-lightColor  dark:hover:text-black"
              >
                {loading ? 'Enviando...' : 'Enviar'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
