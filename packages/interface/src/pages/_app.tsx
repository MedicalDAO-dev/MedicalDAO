import type { AppProps } from "next/app";
import "@/styles/globals.css";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <style jsx global>{`
        html {
          font-family: "Arial";
        }
      `}</style>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
