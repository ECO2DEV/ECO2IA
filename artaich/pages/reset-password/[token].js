// pages/reset-password/[token].js
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { DataResetPassword } from '../../data/resetpassword';
import { CalendarDaysIcon, HandRaisedIcon } from '@heroicons/react/24/outline'

export default function ResetPassword() {
  const router = useRouter();
  const { token } = router.query;
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/reset-password', { token, password });
      setMessage(DataResetPassword.PasswordReset);
    } catch (error) {
      setMessage(DataResetPassword.ErrorPassword);
    }
  };

  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32 ">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 content-container pt-32">
        <div className="max-w-xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:col-span-7 text-center ">
          <h1 className="inline sm:block lg:inline xl:block text-center"> {DataResetPassword.ResetPasswordTitle} </h1>
          <p className="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-gray-300">
          {DataResetPassword.Instructions}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="w-full max-w-md lg:col-span-5 lg:pt-2">
          <div className="flex gap-x-4">
              <label htmlFor="password" className="sr-only"> {DataResetPassword.NewPassword} </label>
              <input id="password" name="password" type="password" value={password} onChange={handlePasswordChange} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder={DataResetPassword.NewPassword} />
              <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 011.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
              {DataResetPassword.ResentPassword}
            </button>
          </div>
        </form>
        {message && <p className="mt-4 text-center text-sm text-red-600">{message}</p>}
      </div>
    </div>
  );
}