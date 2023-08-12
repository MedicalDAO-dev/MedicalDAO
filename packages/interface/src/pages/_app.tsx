import type { AppProps } from "next/app";
import "@/styles/globals.css";
import { Londrina_Solid } from "next/font/google";
import { RecoilRoot } from "recoil";

const LondrinaSolid_normal = Londrina_Solid({
  weight: "400",
  subsets: ["latin"],
});
const LondrinaSolid_bold = Londrina_Solid({
  weight: "900",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <style jsx global>{`
        html {
          font-family: ${LondrinaSolid_normal.style.fontFamily},
            ${LondrinaSolid_bold};
        }
      `}</style>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
