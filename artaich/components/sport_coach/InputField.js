import React from "react";

export const InputField = ({ label, id, value, onChange, type = "text" }) => {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required
        // className="mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        className="block w-fill xl:w-auto flex-1 border-gray-300 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
      />
    </div>
  );
};
