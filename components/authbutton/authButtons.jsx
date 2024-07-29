import Image from "next/image";
import githubLogo from "../../public/github.png";
import googleLogo from "../../public/google.png";
import { signIn } from "next-auth/react";

export function GithubSignInButton() {
  
  return (
    <button
      onClick={() => signIn("github")}
      className="w-full flex gap-4 items-center font-semibold justify-center h-14 px-6 mt-4 text-xl transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-eco2MainColor"
    >
      <Image
       className="w-auto h-auto"
        src={githubLogo}
        alt="Github Logo"
        width={20} height={20}
      />
      <span>Github</span>
    </button>
  );
}

export function GoogleSignInButton() {
 

  return (
    <button
      onClick={() => signIn("google")}
      className="w-full flex gap-4 items-center font-semibold justify-center h-14 px-6 mt-4 text-xl transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-eco2MainColor"
    >
      <Image
       className="w-auto h-auto"
        src={googleLogo}
        alt="Google Logo"
        width={20}
        height={20} />
      <span>Google</span>
    </button>
  );
}
