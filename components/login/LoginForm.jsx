import { isValidEmail } from "../../util/helpers/valid_email";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image"
import logo from "../../public/eco2it_logo.jpeg";
import { DataSignin } from "../../data/signin";

export const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!isValidEmail(email)) {
      toast.error("Email invalido");
      setIsLoading(false);
      return;
    }

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        if (
          result.error.includes("email") ||
          result.error.includes("password")
        ) {
          toast.error(
            "La dirección de correo electrónico o la contraseña son incorrectas"
          );
        } else {
          toast.error(
            "La dirección de correo electrónico o la contraseña son incorrectas "
          );
        }
      } else {
        // Si no hubo errores, puedes redirigir manualmente al dashboard aquí.
        router.push("/dashboard");
      }
    } catch (error) {
      console.error(error);
      toast.error("Se produjo un error inesperado");
    }

    setIsLoading(false);
  };

  return (
    <div
      className="flex w-auto -z-10 flex-col items-center justify-center h-[100vh] dark:bg-zinc-900 bg-image"
      style={{
        backgroundImage: 'url("/bg-image.jpg")',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        filter: "brightness(70%)"
      }}
    >
      <div className="bg-zinc-200 bg-opacity-50 blur-0 border-2 border-green-900 p-10 inset-0 backdrop-filter backdrop-blur-lg shadow-md rounded flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 xl:px-10 md:flex-row lg:flex-none flex-none">
        <div className="mx-auto w-full max-w-md md:w-96 lg:w-96">
          <header className="flex items-center justify-center flex-col">
            <Image className="h-12 w-auto" src={logo} alt="Eco2IA" />
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-[#21c284]">
              {DataSignin.signintitle}
            </h2>
          </header>
          <div className="mt-8">
            <div>
              <div className="relative mt-6">
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">
                    {DataSignin.signinsubtitle2}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <form className="space-y-6" onSubmit={onSubmit}>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-emerald-600 dark:focus:border-[#21c284] focus:outline-none focus:ring-0 focus:border-[#21c284] peer"
                    placeholder=" "
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                  <label
                    htmlFor="floating_email"
                    className="peer-focus:font-medium absolute text-xl leading-6 text-white duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#21c284] peer-focus:dark:text-[#21c284] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    {DataSignin.signinadress}
                  </label>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-emerald-600 dark:focus:border-[#21c284] focus:outline-none focus:ring-0 focus:border-[#21c284] peer"
                    placeholder=" "
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                  <label
                    htmlFor="password"
                    className="peer-focus:font-medium absolute text-xl leading-6 text-white duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#21c284] peer-focus:dark:text-[#21c284] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    {DataSignin.signinpassword}
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-[#21c284] focus:ring-[#21c284]"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-xl text-[#21c284]"
                    >
                      {DataSignin.signinremember}
                    </label>
                  </div>

                  <div className="text-sm">
                    <Link
                      href="/forgot-password"
                      className="font-medium text-[#21c284] hover:text-emerald-900"
                    >
                      {DataSignin.signinforgot}
                    </Link>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="mx-auto w-full mt-8 relative border hover:border-emerald-600 duration-500 group cursor-pointer text-sky-50  overflow-hidden rounded-md bg-emerald-800 p-2 flex justify-center items-center font-extrabold"
                >
                  <div className="absolute z-10 w-48 h-48 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-emerald-900 delay-150 group-hover:delay-75"></div>
                  <div className="absolute z-10 w-40 h-40 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-emerald-800 delay-150 group-hover:delay-100"></div>
                  <div className="absolute z-10 w-32 h-32 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-emerald-700 delay-150 group-hover:delay-150"></div>
                  <div className="absolute z-10 w-24 h-24 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-emerald-600 delay-150 group-hover:delay-200"></div>
                  <div className="absolute z-10 w-16 h-16 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-emerald-500 delay-150 group-hover:delay-300"></div>
                  <div className="z-10 bg-transparent">
                    {isLoading
                      ? DataSignin.signinloading
                      : DataSignin.signinconnect}
                  </div>
                </button>
                {error && (
                  <h4 className="font-medium text-sm text-white"> {error}</h4>
                )}
                <div className="text-sm text-center">
                  <h4 className="font-medium text-sm text-white">o</h4>
                </div>
                <div className="text-sm text-center">
                  <Link
                    href="/auth/signup"
                    className="font-medium text-sm text-[#21c284] hover:text-emerald"
                  >
                    {DataSignin.CreateAccount}
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
  )
}