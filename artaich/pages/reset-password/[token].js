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
      toast.error('Password must be at least 6 characters long.');
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
      toast.success('Password reset successfully.');
      // add a timeout before redirecting to signin
      setTimeout(() => {
        router.push('/auth/signin');
      }, 1000);
    } catch (error) {
      setMessage(DataResetPassword.ErrorPassword);
      toast.error('Error resetting password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-center text-white">
            {' '}
            {DataResetPassword.ResetPasswordTitle}{' '}
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
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
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-100 rounded-t-md bg-gray-800/50 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="New Password"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
