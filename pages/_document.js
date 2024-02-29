import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html className="bg-lightColor dark:bg-darkColor " lang="es">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
