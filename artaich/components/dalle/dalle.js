import { useState } from "react";
import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';
import buttonOption from "../buttonOption/buttonoption";

export default function Dalle() {
  const [prompt, setPrompt] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const strapiToken = process.env.API_TOKEN;

  const FetchData = async () => {
    // Realiza la llamada a la API
    //console.log(prompt);
    const res = await fetch("http://localhost:1337/api/openai/dalle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${strapiToken}`,
      },
      //body: JSON.stringify({prompt})
      body: JSON.stringify({ prompt: prompt }),
    });
    const data = await res.json();
    setImageSrc(data.data);
    console.log(JSON.stringify(data));
  };

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  return (
    <div>
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Dall-e IA
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>
              Generate powerfull images using IA with several variation and able
              to download quickly.
            </p>
          </div>
          <form className="mt-5 sm:flex sm:items-center">
            <div className="w-full sm:max-w-xs">
              <label htmlFor="prompt" className="sr-only">
                prompt
              </label>
              <input
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="prompt"
                onChange={handleInputChange}
              />
            </div>
            <button
              onClick={FetchData}
              type="button"
              className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:mt-0 sm:ml-3 sm:w-auto"
            >
              Generate Image
            </button>
          </form>
        </div>
      </div>
      <br></br>
      <div style={{ display: "flex" }}>
        <buttonOption/>
        <div style={{ flex: 1 }}>
          <img src={imageSrc[0]}/>
          
          </div>
        <br></br>
        <div style={{ flex: 1 }}>
          {imageSrc ? <img src={imageSrc[1]} /> : null}
        </div>
        <br></br>
        <div style={{ flex: 1 }}>
          {imageSrc ? <img src={imageSrc[2]} /> : null}
        </div>
      </div>
      <br></br>
    </div>
  );
}
