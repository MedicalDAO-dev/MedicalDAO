import { Etherscan } from "./Etherscan";
import { Forum } from "./Forum";
import { Twitter } from "./Twitter";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type FooterProps = {} & BaseProps;

/**
 * Footer
 * @keit0728
 */
export const Footer = ({ className }: FooterProps) => {
  return (
    <footer className={clsx(className)}>
      <div className="flex justify-center items-center">
        <div className="w-[1280px] ">
          <div className="mx-[30px] px-[12px]">
            <div className="mx-[417px] pt-[32px] pb-[64px] flex justify-center items-center">
              <Twitter />
              <Etherscan />
              <Forum />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
