import { useState } from "react";
import { useRouter } from "next/router";
import { DataNosIA } from "../../data/nosia";

import { createContactMessage, sendEmail } from "../../util/api/contact";
import { toast } from "react-hot-toast";
import Loader from "../loader/loader";

export const ContacUsPricing = ({ onClose = () => {} }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isNotHomepage = router.pathname !== "/";

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    company: "",
    telephone: "",
    message: "",
  });

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      formData.name === "" ||
      formData.lastName === "" ||
      formData.email === "" ||
      formData.telephone === "" ||
      formData.message === ""
    ) {
      toast.error(DataNosIA.NosIAPleaseFill);
      setLoading(false);
      return;
    }

    if (
      formData.name.length < 3 ||
      formData.name.length > 50 ||
      formData.lastName.length < 3 ||
      formData.lastName.length > 50
    ) {
      toast.error(DataNosIA.NosIANameLastName);
      setLoading(false);
      return;
    }

    if (!formData.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      toast.error(DataNosIA.NosIAValidEmail);
      setLoading(false);
      return;
    }
    if (!formData.email) {
      toast.error(DataNosIA.NosIAValidEmail);
      setLoading(false);
      return;
    }

    try {
      const contactPromise = createContactMessage({ formData: formData });
      const emailPromise = sendEmail({ formData: formData });

      const [contactResponse, emailResponse] = await Promise.all([
        contactPromise,
        emailPromise,
      ]);

      toast.success(DataNosIA.NosIAMessageSent);

      if (!isNotHomepage) {
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setTimeout(() => {
          router.reload();
        }, 1500);
      }
    } catch (error) {
      toast.error(DataNosIA.NosIASomethingWrong);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative isolate bg-lightColor dark:bg-darkColor px-6 py-24 sm:py-32 lg:px-8">
      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
            width={200}
            height={200}
            x="50%"
            y={-64}
            patternUnits="userSpaceOnUse"
          >
            <path d="M100 200V.5M.5 .5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y={-64} className="overflow-visible fill-gray-50">
          <path
            d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M299.5 800h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect
          width="100%"
          height="100%"
          strokeWidth={0}
          fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
        />
      </svg>
      <div className="mx-auto max-w-xl lg:max-w-4xl">
        <h2 className="text-4xl font-bold tracking-tight ">
          {DataNosIA.NosIACONTACTFORMtitle}
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          {DataNosIA.NosIACONTACTFORMdescription}
        </p>
        <div className="mt-16 flex flex-col gap-16 sm:gap-y-20 lg:flex-row">
          <form onSubmit={handleSubmit} method="POST" className="lg:flex-auto">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="first-name"
                  className="block text-sm font-semibold leading-6 dark:text-white"
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
                    className="block w-full rounded-md border-white bg-darkBgCard px-3.5 py-2 text-white shadow-sm ring-1 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="last-name"
                  className="block text-sm font-semibold leading-6 dark:text-white"
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
                    className="block w-full rounded-md border-white bg-darkBgCard px-3.5 py-2 text-white shadow-sm ring-1 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold leading-6 dark:text-white"
                >
                  {DataNosIA.NosIACONTACTFORMemail}
                </label>
                <div className="mt-2.5">
                  <input
                    onChange={(e) => handleContactChange(e)}
                    id="email"
                    name="email"
                    type="email"
                    className="block w-full rounded-md border-white bg-darkBgCard px-3.5 py-2 text-white shadow-sm ring-1 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-semibold leading-6 dark:text-white"
                >
                  {DataNosIA.NosIACONTACTFORMcompany}
                </label>
                <div className="mt-2.5">
                  <input
                    onChange={(e) => handleContactChange(e)}
                    type="text"
                    name="company"
                    id="company"
                    className="block w-full rounded-md border-white bg-darkBgCard px-3.5 py-2 text-white shadow-sm ring-1 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-lg leading-6">
                  <label
                    htmlFor="telephone"
                    className="block text-sm font-semibold leading-6 dark:text-white"
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
                    className="block w-full rounded-md border-white bg-darkBgCard px-3.5 py-2 text-white shadow-sm ring-1 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <div className="flex justify-between text-lg leading-6">
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold leading-6 dark:text-white"
                  >
                    {DataNosIA.NosIACONTACTFORMhowwecanhelpyou}
                  </label>
                  <p id="message-description" className="text-gray-400 text-sm">
                    {DataNosIA.NosIACONTACTFORMcharacters}
                  </p>
                </div>
                <div className="mt-2.5">
                  <textarea
                    onChange={(e) => handleContactChange(e)}
                    id="message"
                    name="message"
                    rows={4}
                    className="block w-full rounded-md border-white bg-darkBgCard px-3.5 py-2 text-white shadow-sm ring-1 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
              </div>
            </div>
            <div className="mt-10 flex justify-center border-t border-gray-900/10 pt-8">
              {loading ? (
                <Loader />
              ) : (
                <button
                  type="submit"
                  className={`rounded-md bg-eco2MainColor px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-eco2HoverColor transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                >
                  {DataNosIA.NosIACONTACTFORMsendmessage}
                </button>
              )}
            </div>
            {/* <p className="mt-4 text-sm leading-6 text-gray-500">
              By submitting this form, I agree to the{" "}
              <a href="#" className="font-semibold text-indigo-600">
                privacy&nbsp;policy
              </a>
              .
            </p> */}
          </form>
          <div className="lg:mt-6 lg:w-80 lg:flex-none">
            <div className="flex leading-6">
              {/* <img
                className="h-16 w-auto img-filter-green"
                src="https://eco2.com.co/moanooch/2021/09/Eco3.gif"
                alt="Eco2 Animation"
              /> */}
              <p className="text-eco2MainColor text-5xl font-bold">Eco2</p>
            </div>
            <figure className="mt-10">
              <blockquote className="text-lg font-semibold leading-8 text-gray-900 dark:text-white">
                <p>
                  “Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
                  expedita voluptas culpa sapiente alias molestiae. Numquam
                  corrupti in laborum sed rerum et corporis.”
                </p>
              </blockquote>
              <figcaption className="mt-10 flex gap-x-6">
                <img
                  src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=96&h=96&q=80"
                  alt=""
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                />
                <div>
                  <div className="text-base font-semibold text-gray-900 dark:text-white">
                    Brenna Goyette
                  </div>
                  <div className="text-sm leading-6 text-gray-600">
                    CEO of Workcation
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};
