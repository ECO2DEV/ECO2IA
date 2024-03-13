import React, { useRef, useState } from "react";
import Image from "next/image";
import { InformationCircleIcon } from "@heroicons/react/20/solid";
import visa from "../../public/creditCard/visa.svg";
import amex from "../../public/creditCard/amex.svg";
import mastercard from "../../public/creditCard/Mastercard.svg";

export function BillingAndPayment() {
  const [showTooltip, setShowTooltip] = useState(false);
  const yearInputRef = useRef(null);

  const toggleTooltip = () => {
    setShowTooltip(!showTooltip);
  };

  const handleMonthInput = (e) => {
    const value = e.target.value;
    if (value.length === 2) {
      yearInputRef.current.focus();
    }
  };

  return (
    // <div className="space-y-10 divide-y divide-gray-900/10 dark:divide-gray-100">
    //   {/* ---------billing----------- */}
    //   <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
    //     <div className="px-4 sm:px-0">
    //       <h2 className="text-base font-semibold leading-7 dark:text-white text-gray-900">
    //         Billing information
    //       </h2>
    //       <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-100">
    //         Add a payment method
    //       </p>
    //     </div>
    <>
      <form
        autoComplete="on"
        method="POST"
        noValidate
        className="bg-white dark:bg-lightColor shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
      >
        <div className="px-4 py-6 sm:p-8">
          <div className="mt-4">
            <label
              htmlFor="card-number"
              className="block text-sm font-medium leading-6 text-black"
            >
              Número de tarjeta
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  role="img"
                  className="h-6 w-6 text-gray-500"
                >
                  <path
                    vector-effect="non-scaling-stroke"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-miterlimit="10"
                    stroke-width="1.5"
                    d="M19 20H5c-1.7 0-3-1.3-3-3V8c0-1.7 1.3-3 3-3h14c1.7 0 3 1.3 3 3v9c0 1.6-1.4 3-3 3z"
                  ></path>
                  <path fill="currentColor" d="M22 8H2v3h20V8z"></path>
                </svg>
              </div>
              <input
                type="text"
                name="card-number"
                id="card-number"
                className="focus:bg-darkColor us:border-white er:border-white bg-darkBgCard block w-full pl-10 pr-36 sm:text-sm text-white rounded-md"
                placeholder="1234 5678 9012 3456"
                required
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <div className="flex justify-end">
                  <Image src={visa} alt="Visa" className="h-6 max-w-7" />

                  <Image src={mastercard} alt="Mastercard" className="h-6 max-w-7" />
                  <Image src={amex} alt="Amex" className="h-6 max-w-7" />
                </div>
              </div>

            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="pc-first-name"
                className="block text-sm font-medium leading-6 text-black"
              >
                Primer nombre
              </label>
              <input
                id="pc-first-name"
                type="text"
                autoComplete="cc-given-name"
                maxLength="60"
                className="mt-1 block w-full focus:bg-darkColor us:border-white er:border-white bg-darkBgCard text-white shadow-sm rounded-md p-2"
                placeholder="Sneyder Joaquin"
              />
            </div>
            <div>
              <label
                htmlFor="pc-last-name"
                className="block text-sm font-medium leading-6 text-black"
              >
                Apellido
              </label>
              <input
                id="pc-last-name"
                type="text"
                autoComplete="cc-family-name"
                maxLength="60"
                className="mt-1 block w-full focus:bg-darkColor us:border-white er:border-white bg-darkBgCard shadow-sm rounded-md p-2"
                placeholder="Huertas Rodriguez"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label
                htmlFor="expiry-month"
                className="block text-sm font-medium leading-6 text-black"
              >
                Expiration month
              </label>
              <input
                id="expiry-month"
                type="text"
                placeholder="MM"
                className="mt-1 block w-full focus:bg-darkColor us:border-white er:border-white bg-darkBgCard rounded-md p-2"
                autoComplete="cc-exp"
                maxLength="2"
                onChange={handleMonthInput}
                required
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="expiry-year"
                className="block text-sm font-medium leading-6 text-black"
              >
                Expiration year
              </label>
              <input
                ref={yearInputRef}
                id="expiry-year"
                type="text"
                placeholder="YY"
                className="mt-1 block w-full focus:bg-darkColor us:border-white er:border-white bg-darkBgCard rounded-md p-2"
                autoComplete="cc-exp"
                maxLength="2"
                required
              />
            </div>
          </div>
          <div className="relative">
            <label
              htmlFor="security-code"
              className="block text-sm font-medium leading-6 text-black"
            >
              Security code
              <InformationCircleIcon
                className="inline ml-2 w-5 h-5 text-gray-500 cursor-pointer"
                onClick={toggleTooltip}
              />
            </label>
            <input
              id="security-code"
              type="text"
              maxLength="3"
              className="mt-1 block w-full focus:bg-darkColor us:border-white er:border-white bg-darkBgCard shadow-sm rounded-md p-2"
              placeholder="3 digits"
              autoComplete="cc-csc"
              required
            />
            {showTooltip && (
              <div className="absolute top-full mt-2 right-0 z-10 w-64 p-2 bg-white border border-gray-300 rounded-md shadow-lg">
                <p className="text-sm text-gray-700">
                  El número de 3 dígitos ubicado en el reverso derecho de su
                  tarjeta.
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="px-4 py-6 sm:p-8">
          <h3 className="text-darkColor">Dirección de facturación</h3>
          <div data-qa="address-form" className="air3-grid-container row-gap-0">
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-black"
              >
                País
              </label>
              <select
                id="country"
                name="country"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base focus:outline-none  bg-darkBgCard text-white sm:text-sm sm:leading-6 shadow-none der der-white  white/5 focus:bg-darkColor us:border-white er:border-white rounded-md"
                defaultValue="CO"
              >
                <option value="CO">Colombia</option>
                <option value="AR">Argentina</option>
                <option value="MX">México</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="address-street"
                className="block text-sm font-medium leading-6 text-black"
              >
                Línea de dirección 1
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full focus:bg-darkColor us:border-white er:border-white bg-darkBgCard shadow-sm rounded-md p-2"
                id="address-street"
                autoComplete="billing address-line1"
                minLength="2"
                maxLength="60"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="address-street2"
                className="block text-sm font-medium leading-6 text-black"
              >
                Línea de dirección 2{" "}
                <span className="text-gray-500">(opcional)</span>
              </label>
              <input
                type="text"
                className="mt-1 block w-full focus:bg-darkColor us:border-white er:border-white bg-darkBgCard shadow-sm rounded-md p-2"
                id="address-street2"
                autoComplete="billing address-line2"
                maxLength="60"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="md:mb-0">
                <label
                  htmlFor="address-city"
                  className="block text-sm font-medium leading-6 text-black"
                >
                  Ciudad
                </label>
                <input
                  id="address-city"
                  type="text"
                  autoComplete="billing address-level2"
                  required
                  maxLength="50"
                  className="mt-1 block w-full focus:bg-darkColor us:border-white er:border-white bg-darkBgCard shadow-sm rounded-md p-2"
                  placeholder="Villavicencio"
                />
              </div>
              <div>
                <label
                  htmlFor="address-zip"
                  className="block text-sm font-medium leading-6 text-black"
                >
                  Código postal{" "}
                  <span className="text-gray-500">(opcional)</span>
                </label>
                <input
                  id="address-zip"
                  type="text"
                  autoComplete="billing postal-code"
                  maxLength="10"
                  className="mt-1 block w-full focus:bg-darkColor us:border-white er:border-white bg-darkBgCard shadow-sm rounded-md p-2"
                  placeholder="Código postal"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
      {/* --------billing-------- */}
    </>
  );
}
