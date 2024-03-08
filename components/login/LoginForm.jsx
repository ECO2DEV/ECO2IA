import { isValidEmail } from '../../util/helpers/valid_email';
import { toast, Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import LogoTipoECO2verde from '../../public/LogoTipoECO2verde.png';
import { DataSignin } from '../../data/signin';
import {
  GithubSignInButton,
  GoogleSignInButton
} from '../authbutton/authButtons';

export const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!isValidEmail(email)) {
      toast.error('Email invalido');
      setIsLoading(false);
      return;
    }

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      });

      if (result?.error) {
        if (
          result.error.includes('email') ||
          result.error.includes('password')
        ) {
          toast.error(
            'La dirección de correo electrónico o la contraseña son incorrectas'
          );
        } else {
          toast.error(
            'La dirección de correo electrónico o la contraseña son incorrectas '
          );
        }
      } else {
        // Si no hubo errores, puedes redirigir manualmente al dashboard aquí.
        router.push('/dashboard');
      }
    } catch (error) {
      console.error(error);
      toast.error('Se produjo un error inesperado');
    }

    setIsLoading(false);
  };

  return (
    <section className="flex dark:bg-darkColor w-auto -z-10 flex-col items-center justify-center h-screen">
        <div className="w-full sm:max-w-md ">
          <header className="flex items-center justify-center flex-col">
            <Image className="h-28 w-28" src={LogoTipoECO2verde} alt="Eco2IA logo" />
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-eco2MainColor">
              {DataSignin.signintitle}
            </h2>
          </header>
          
            <div className="mt-10 flex flex-col">
              <form className="space-y-6 flex flex-col" onSubmit={onSubmit}>
                <div className="relative flex justify-center mb-5">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="block py-2.5  w-full text-sm bg-transparent border-0 border-b-2 mx-auto sm:mx-0  border-gray-300 dark:text-white dark:border-emerald-600 dark:focus:border-eco2MainColor focus:outline-none focus:ring-0 focus:border-eco2MainColor"
                    placeholder=""
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                  <label
                    htmlFor="email"
                    className="absolute text-xl leading-6 dark:text-white left-4 md:left-0 -top-6"
                  >
                    {DataSignin.signinadress}
                  </label>
                </div>

                <div className="relative flex justify-center mb-5">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="block py-2.5  w-full text-sm bg-transparent border-0 border-b-2 mx-auto sm:mx-0  border-gray-300 dark:text-white dark:border-emerald-600 dark:focus:border-eco2MainColor focus:outline-none focus:ring-0 focus:border-eco2MainColor"  placeholder=""
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                  <label
                    htmlFor="password"
                    className="absolute text-xl leading-6 dark:text-white left-4 md:left-0 -top-6"
                  >
                    {DataSignin.signinpassword}
                  </label>
                </div>

                <div className="flex items-center justify-evenly md:justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-eco2MainColor focus:ring-eco2MainColor"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-eco2MainColor font-medium"
                    >
                      {DataSignin.signinremember}
                    </label>
                  </div>

                  <div className="text-sm">
                    <Link
                      href="/forgot-password"
                      className="font-medium text-eco2MainColor hover:text-emerald-900"
                    >
                      {DataSignin.signinforgot}
                    </Link>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="mx-auto bg-eco2MainColor w-full rounded-lg text-white  py-3 text-base hover:bg-eco2HoverColor cursor-pointer transition"
                >
                  {isLoading
                    ? DataSignin.signinloading
                    : DataSignin.signinconnect}
                </button>
                {error && (
                  <h4 className="font-medium text-sm text-white"> {error}</h4>
                )}
                <div>
                  <div className="relative mt-10">
                    <div
                      className="absolute inset-0 flex items-center"
                      aria-hidden="true"
                    >
                      <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm font-medium leading-6">
                      <span className="dark:bg-darkBgCard bg-eco2MainColor/50 rounded-lg px-8 text-gray-900 dark:text-white text-center ">
                        o continuar con
                      </span>
                    </div>
                  </div>
                </div>
              </form>
              <div className="mt-6 flex justify-between gap-5">
                <GithubSignInButton />
                <GoogleSignInButton />
              </div>
              <h4 className="font-medium text-center text-lg text-black dark:text-white">
                o
              </h4>
              <Link
                href="/auth/signup"
                className="font-medium text-sm text-eco2MainColor hover:text-emerald flex justify-center hover:scale-105 transition hover:opacity-80"
              >
                {DataSignin.CreateAccount}
              </Link>
            </div>
         
        </div>
      <Toaster position="top-center" />
    </section>
  );
};
