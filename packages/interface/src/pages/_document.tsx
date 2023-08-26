import { Head, Html, Main, NextScript } from "next/document";
import clsx from "clsx";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Londrina+Solid&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className={clsx("plaintext")}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
