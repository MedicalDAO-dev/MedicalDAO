import { Footer } from "@/components/layouts/Footer";
import { Header } from "@/components/layouts/Header";
import { Main } from "@/components/layouts/Main";
import { MainHome } from "@/components/layouts/Main/MainHome";
import clsx from "clsx";

export default function Home() {
  return (
    <div className={clsx("flex-col", "justify-center", "items-center")}>
      <Header />
      <Main>
        <MainHome />
      </Main>
      <Footer />
    </div>
  );
}
