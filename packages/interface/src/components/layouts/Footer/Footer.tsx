import { Discord } from "@/components/layouts/Footer/Discord";
import { Etherscan } from "@/components/layouts/Footer/Etherscan";
import { Twitter } from "@/components/layouts/Footer/Twitter";
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
      className={clsx(
        className,
        "flex justify-center items-center",
        "pt-8 pb-16",
        "bg-background-footer",
      )}
    >
      <Twitter className={clsx("mr-8")} />
      <Etherscan className={clsx("mr-8")} />
      <Discord />
    </footer>
  );
};
