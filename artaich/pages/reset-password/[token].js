import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form'; // Import useForm and Controller
import { DataResetPassword } from '../../data/resetpassword';
import { header, strapiUrl } from '../../constants/constans';
import { Toaster, toast } from 'react-hot-toast';

export default function ResetPassword() {
  const router = useRouter();
  const { token } = router.query;
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm();

  const handlePasswordChange = (e) => setNewPassword(e.target.value);

  const onSubmit = async (e) => {
    // validate the input has a valid passw format
    const passw = /^[^\s]{6,}$/;

    if (!newPassword.match(passw)) {
      toast.error(DataResetPassword.PasswordMust);
      return;
    }

    try {
      await axios.post(
        `${strapiUrl}/api/auth/reset-password`,
        {
          token,
          newPassword
        },
        header
      );
      setMessage(DataResetPassword.PasswordReset);
      toast.success(DataResetPassword.PasswordReset);
      // add a timeout before redirecting to signin
      setTimeout(() => {
        router.push('/auth/signin');
      }, 3000);
    } catch (error) {
      setMessage(DataResetPassword.ErrorPassword);
      toast.error(DataResetPassword.ErrorPassword);
    }
  };

  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32 ">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 content-container pt-32">
        <div className="max-w-xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:col-span-7 text-center" >
          <h1 className="inline sm:block lg:inline xl:block text-center">
            {' '}
            {DataResetPassword.ResetPasswordTitle}{' '}
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-gray-300">
          {DataResetPassword.Instructions}
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md lg:col-span-5 lg:pt-2">
          <div className="flex gap-x-4">
              <label htmlFor="newPassword" className="sr-only">
                {' '}
                {DataResetPassword.NewPassword}{' '}
              </label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                value={newPassword}
                onChange={handlePasswordChange}
                className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                placeholder={DataResetPassword.NewPassword}
              />
              <button
              type="submit"
              className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  {/* SVG path */}
                </svg>
              </span>
              {DataResetPassword.ResentPassword}
            </button>
          </div>
        </form>
      </div>
      <Toaster position="top-center" />
    </div>
  );
}
