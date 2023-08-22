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
    <footer
      className={clsx(className, "flex", "justify-center", "items-center")}
    >
      <div className={clsx("w-[1280px]", "mx-[30px]", "px-[12px]")}>
        <div
          className={clsx(
            "mx-[417px]",
            "pt-[32px]",
            "pb-[64px]",
            "flex",
            "justify-center",
            "items-center",
          )}
        >
          <Twitter />
          <Etherscan />
          <Forum />
        </div>
      </div>
    </footer>
  );
};
