import React, { useRef, useState } from "react";
import Image from "next/image";
import { InformationCircleIcon } from "@heroicons/react/20/solid";
// import bcrypt from "bcrypt";

import { createBillingInfo } from "../../util/api/billingAndPayment";

import visa from "../../public/creditCard/visa.svg";
import amex from "../../public/creditCard/amex.svg";
import mastercard from "../../public/creditCard/Mastercard.svg";

export function BillingAndPayment() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [formData, setFormData] = useState({
    CreditCard: "",
    Name: "",
    LastName: "",
    ExpirationMonth: "",
    ExpirationYear: "",
    SecurityCode: "",
    Country: "CO",
    Address: "",
    AddressOptional: "",
    City: "",
    PostalCode: "",
  });
  const yearInputRef = useRef(null);

  const toggleTooltip = () => {
    setShowTooltip(!showTooltip);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMonthInput = (e) => {
    const value = e.target.value;

    handleInputChange(e);
    if (value.length === 2) {
      yearInputRef.current.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentYear = new Date().getFullYear();
    const formattedExpirationMonth = `${formData.ExpirationMonth.padStart(
      2,
      "0"
    )}/1/${currentYear}`;

    // Formatea la fecha de expiración del año como 01/01/YYYY
    const formattedExpirationYear = `1/1/20${formData.ExpirationYear}`;
    // const cardNumber = formData.CreditCard;
    // const salt = bcrypt.genSaltSync(10);
    // const hash = bcrypt.hashSync(cardNumber, salt);

    const submitData = {
      ...formData,
      // CreditCard: hash,
      ExpirationMonth: formattedExpirationMonth,
      ExpirationYear: formattedExpirationYear,
    };
    try {
      const response = await createBillingInfo({ formData: submitData });
      console.log(response);
    } catch (error) {
      console.error("Error enviando el formulario:", error);
    }
  };

  return (
    <>
      <form
        autoComplete="on"
        method="POST"
        noValidate
        onSubmit={handleSubmit}
        className="bg-white dark:bg-lightColor shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
      >
        <div className="px-4 py-6 sm:p-8">
          {/* <div className="mt-4">
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
          </div> */}
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
                    vectorEffect="non-scaling-stroke"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth="1.5"
                    d="M19 20H5c-1.7 0-3-1.3-3-3V8c0-1.7 1.3-3 3-3h14c1.7 0 3 1.3 3 3v9c0 1.6-1.4 3-3 3z"
                  ></path>
                  <path fill="currentColor" d="M22 8H2v3h20V8z"></path>
                </svg>
              </div>
              <input
                type="text"
                name="CreditCard"
                id="CreditCard"
                value={formData.CreditCard}
                onChange={handleInputChange}
                className="focus:bg-darkColor border-white bg-darkBgCard block w-full pl-10 pr-24 sm:text-sm text-white rounded-md input-card-number"
                placeholder="1234 5678 9012 3456"
                required
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <div className="flex space-x-2">
                  <Image
                    src={visa}
                    alt="Visa"
                    className="h-6 w-auto card-icon"
                  />
                  <Image
                    src={mastercard}
                    alt="Mastercard"
                    className="h-6 w-auto card-icon"
                  />
                  <Image
                    src={amex}
                    alt="Amex"
                    className="h-6 w-auto card-icon"
                  />
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
                id="Name"
                type="text"
                name="Name"
                onChange={handleInputChange}
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
                id="LastName"
                type="text"
                name="LastName"
                onChange={handleInputChange}
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
                id="ExpirationMonth"
                onChange={handleMonthInput}
                type="text"
                name="ExpirationMonth"
                placeholder="MM"
                className="mt-1 block w-full focus:bg-darkColor us:border-white er:border-white bg-darkBgCard rounded-md p-2"
                autoComplete="cc-exp"
                maxLength="2"
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
                onChange={handleInputChange}
                type="text"
                id="ExpirationYear"
                name="ExpirationYear"
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
              id="SecurityCode"
              type="password"
              name="SecurityCode"
              onChange={handleInputChange}
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
                id="Country"
                name="Country"
                onChange={handleInputChange}
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
                id="Address"
                name="Address"
                onChange={handleInputChange}
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
                id="AddressOptional"
                name="AddressOptional"
                onChange={handleInputChange}
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
                  id="City"
                  type="text"
                  name="City"
                  autoComplete="billing address-level2"
                  required
                  maxLength="50"
                  onChange={handleInputChange}
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
                  id="PostalCode"
                  type="text"
                  name="PostalCode"
                  autoComplete="billing postal-code"
                  onChange={handleInputChange}
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
    </>
  );
}
