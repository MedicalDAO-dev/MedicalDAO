import type { AppProps } from "next/app";
import Head from "next/head";
import { useInit } from "@/hooks/useInit";
import { config } from "@/lib/chain/chain";
import "@/styles/globals.css";
import { RecoilRoot } from "recoil";
import { WagmiConfig } from "wagmi";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="msapplication-square70x70logo"
          content="/assets/favicons/site-tile-70x70.png"
        />
        <meta
          name="msapplication-square150x150logo"
          content="/assets/favicons/site-tile-150x150.png"
        />
        <meta
          name="msapplication-wide310x150logo"
          content="/assets/favicons/site-tile-310x150.png"
        />
        <meta
          name="msapplication-square310x310logo"
          content="/assets/favicons/site-tile-310x310.png"
        />
        <meta name="msapplication-TileColor" content="#0078d7" />
        <link
          rel="shortcut icon"
          type="image/vnd.microsoft.icon"
          href="/assets/favicons/favicon.ico"
        />
        <link
          rel="icon"
          type="image/vnd.microsoft.icon"
          href="/assets/favicons/favicon.ico"
        />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/assets/favicons/apple-touch-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/assets/favicons/apple-touch-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/assets/favicons/apple-touch-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/assets/favicons/apple-touch-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/assets/favicons/apple-touch-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/assets/favicons/apple-touch-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/assets/favicons/apple-touch-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/assets/favicons/apple-touch-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/favicons/apple-touch-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="36x36"
          href="/assets/favicons/android-chrome-36x36.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="48x48"
          href="/assets/favicons/android-chrome-48x48.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="72x72"
          href="/assets/favicons/android-chrome-72x72.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/assets/favicons/android-chrome-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="128x128"
          href="/assets/favicons/android-chrome-128x128.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="144x144"
          href="/assets/favicons/android-chrome-144x144.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="152x152"
          href="/assets/favicons/android-chrome-152x152.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/assets/favicons/android-chrome-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="256x256"
          href="/assets/favicons/android-chrome-256x256.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="384x384"
          href="/assets/favicons/android-chrome-384x384.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/assets/favicons/android-chrome-512x512.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="36x36"
          href="/assets/favicons/icon-36x36.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="48x48"
          href="/assets/favicons/icon-48x48.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="72x72"
          href="/assets/favicons/icon-72x72.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/assets/favicons/icon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="128x128"
          href="/assets/favicons/icon-128x128.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="144x144"
          href="/assets/favicons/icon-144x144.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="152x152"
          href="/assets/favicons/icon-152x152.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="160x160"
          href="/assets/favicons/icon-160x160.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/assets/favicons/icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="196x196"
          href="/assets/favicons/icon-196x196.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="256x256"
          href="/assets/favicons/icon-256x256.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="384x384"
          href="/assets/favicons/icon-384x384.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/assets/favicons/icon-512x512.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/favicons/icon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="24x24"
          href="/assets/favicons/icon-24x24.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/favicons/icon-32x32.png"
        />
        <link rel="manifest" href="/assets/favicons/manifest.json" />
        <meta charSet="utf-8" />
        <title>MedicalDAO</title>
        <meta
          name="description"
          content="MedicalDAOは「分散型医療」の実現を目指すプラットフォームです。DAO(Decentralized Autonomous Organization) の金字塔、Nounsのコンセプトを基に構築されています。新しい医療コミュニティを形成し、全ての決定はコミュニティが主導します。 医療者と非医療者が共創するプロジェクトを通じて、個人の医療データ所有と公平な医療アクセスを提供することが私たちのビジョンです。"
        />
        <meta name="thumbnail" content="/assets/images/logo.webp" />
        <meta
          property="og:title"
          content="MedicalDAOは「分散型医療」の実現を目指すプラットフォームです。DAO(Decentralized Autonomous Organization) の金字塔、Nounsのコンセプトを基に構築されています。新しい医療コミュニティを形成し、全ての決定はコミュニティが主導します。 医療者と非医療者が共創するプロジェクトを通じて、個人の医療データ所有と公平な医療アクセスを提供することが私たちのビジョンです。"
        />
        <meta property="og:url" content="https://example.com/" />
        <meta
          property="og:description"
          content="MedicalDAOは「分散型医療」の実現を目指すプラットフォームです。DAO(Decentralized Autonomous Organization) の金字塔、Nounsのコンセプトを基に構築されています。新しい医療コミュニティを形成し、全ての決定はコミュニティが主導します。 医療者と非医療者が共創するプロジェクトを通じて、個人の医療データ所有と公平な医療アクセスを提供することが私たちのビジョンです。"
        />
        <meta property="og:image" content="/assets/images/logo.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@medicaldaoweb3" />
      </Head>
      <RecoilRoot>
        <WagmiConfig config={config}>
          <Init />
          <Component {...pageProps} />
        </WagmiConfig>
      </RecoilRoot>
    </>
  );
}

const Init = () => {
  useInit();
  return <></>;
};
