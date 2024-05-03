import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html
      className="bg-no-repeat aspect-video w-full bg-cover bg-center bg-[url('/darkWaves.webp')] overflow-y-hidden h-full"
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
