// pages/forgot-password.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form'; // Import useForm and Controller
import axios from 'axios';
import { header, strapiUrl } from '../constants/constans';
import { toast, Toaster } from 'react-hot-toast';
import Loader from '../components/loader/loader';
import { DataForgotPassword } from '../data/forgotpassword';

export default function ForgotPassword() {
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm();

  const onSubmit = async ({ email }) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${strapiUrl}/api/auth/forgot-password`,
        { email },
        header
      );
      console.log('response', response);
      setMessage(DataForgotPassword.ResetPassWord);
      toast.success('Reset password link sent. Please check your email.');
      // router.push('/auth/signin');
    } catch (error) {
      setMessage(DataForgotPassword.SomethingWrong);
      toast.error(' Error sending reset password link. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-gray-900 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:py-32">
            <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-5xl">
              {DataForgotPassword.ForgotPassword}
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-center text-2xl leading-8 text-gray-300">
              {DataForgotPassword.ForgotPasswordInstructions}
            </p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mx-auto mt-10 flex max-w-md gap-x-8"
            >
              <label className="w-full">
                <Controller
                  name="email" // Name of the field in the form values object
                  control={control} // Control prop from useForm
                  defaultValue="" // Initial value of the input (empty in this case)
                  rules={{
                    required: DataForgotPassword.EmailRequired, // Validate if the email field is empty
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, // Validate email format
                      message: DataForgotPassword.InvalidEmail
                    }
                  }}
                  render={({ field }) => (
                    <>
                      <input
                        {...field}
                        className="w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
                        type="email"
                        placeholder={DataForgotPassword.EnterEmail}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1 ml-3">
                          {errors.email.message}
                        </p>
                      )}
                      {message && (
                        <p className="text-gray-100 text-sm mt-1 ml-3">
                          {message}
                        </p>
                      )}
                    </>
                  )}
                />
              </label>

              <button
                type="submit"
                className="flex-none rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isLoading ? (
                  <div className="flex justify-center items-center">
                    <Loader />
                  </div>
                ) : (
                  'Send Reset Link'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Toaster position="top-center" />
    </>
  );
}
