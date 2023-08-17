// pages/forgot-password.js
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form'; // Import useForm and Controller
import axios from 'axios';
import { strapiUrl, header } from '../constants/constans';
import { DataForgotPassword } from '../data/forgotpassword';

export default function ForgotPassword() {
  const [message, setMessage] = useState(null);

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm();

  const onSubmit = async ({ email }) => {
    try {
      const response = await axios.post(
        `${strapiUrl}/api/forgot`,
        { email: email },
        header
      );
      console.log('response', response);
      setMessage(DataForgotPassword.ResetPassWord);
    } catch (error) {
      setMessage(DataForgotPassword.SomethingWrong);
    }
  };

  return (
    <div className="bg-gray-900 py-16 sm:py-24">
      <div ClassName="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:py-32">
      <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-5xl">{DataForgotPassword.ForgotPassword}</h2>
      <p className="mx-auto mt-2 max-w-xl text-center text-2xl leading-8 text-gray-300">{DataForgotPassword.ForgotPasswordInstructions}</p>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-10 flex max-w-md gap-x-8">
          <label className="w-full">
            
            <Controller
              name="email" // Name of the field in the form values object
              control={control} // Control prop from useForm
              defaultValue="" // Initial value of the input (empty in this case)
              rules={{
                required: (DataForgotPassword.EmailRequired), // Validate if the email field is empty
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, // Validate email format
                  message: (DataForgotPassword.InvalidEmail)
                }
              }}
              render={({ field }) => (
                <input
                  {...field}
                  className="w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
                  type="email"
                  placeholder= {DataForgotPassword.EnterEmail}
                />
              )}
            />
          </label>
          {errors.email && <p>{errors.email.message}</p>}{' '}
          {/* Display the validation error message */}
       
        <button
          type="submit"
          className="flex-none rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
         {DataForgotPassword.ResetLink}
        </button>
      </form>
      {message && <p>{message}</p>}
     </div>
      </div>
      
    </div>
  );
}

