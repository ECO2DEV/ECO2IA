import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html
      className="bg-no-repeat aspect-video w-full bg-cover bg-center bg-[url('/bgLight.svg')] dark:bg-[url('/bgDark.svg')]"
      lang="es"
    >
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
