import Image from "next/image";
import githubLogo from "../../public/github.png";
import { signIn } from "next-auth/react";

export function GithubSignInButton() {
  return (
    <button
      onClick={() => signIn("github")}
      className="w-full flex gap-4 items-center font-semibold justify-center h-14 px-6 mt-4 text-xl transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-eco2MainColor"
    >
      <Image
        src={githubLogo}
        alt="Github Logo"
        width={20} height={20}
      />
      <span>Iniciar Sesion con Google</span>
    </button>

  );
}