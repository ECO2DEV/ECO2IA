// pages/forgot-password.js
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form'; // Import useForm and Controller
import axios from 'axios';
import { header, strapiUrl } from '../constants/constans';
import { toast, Toaster } from 'react-hot-toast';
import Loader from '../components/loader/loader';

export default function ForgotPassword() {
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm();

  const onSubmit = async ({ email }) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${strapiUrl}/api/auth/reset-password`,
        { email },
        header
      );
      console.log('response', response);
      setMessage('Reset password link sent. Please check your email.');
      toast.success('Reset password link sent. Please check your email.');
    } catch (error) {
      setMessage('Error sending reset password link. Please try again.');
      toast.error(' Error sending reset password link. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="h-screen flex flex-col justify-center items-center">
        <h2 className="text-2xl mb-4">Forgot Password</h2>
        <p className="mb-4">Insert your email address to reset your password</p>
        <form onSubmit={handleSubmit(onSubmit)} className="w-96">
          <div className="grid grid-cols-1 gap-6">
            <label className="block">
              Email address:
              <Controller
                name="email" // Name of the field in the form values object
                control={control} // Control prop from useForm
                defaultValue="" // Initial value of the input (empty in this case)
                rules={{
                  required: 'Email is required', // Validate if the email field is empty
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, // Validate email format
                    message: 'Invalid email address'
                  }
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    className="mt-1 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-slate-600"
                    type="email"
                  />
                )}
              />
            </label>
            {errors.email && <p>{errors.email.message}</p>}{' '}
            {/* Display the validation error message */}
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 rounded-md mt-4 p-2 w-full text-white text-xl font-bold uppercase disabled:bg-slate-200 transition-all duration-300 ease-in-out"
          >
            {isLoading ? (
              <div className="flex justify-center items-center">
                {' '}
                <Loader />
              </div>
            ) : (
              'Send reset password link'
            )}
          </button>
        </form>
        {message && <p>{message}</p>}
      </section>
      <Toaster position="top-center" />
    </>
  );
}
