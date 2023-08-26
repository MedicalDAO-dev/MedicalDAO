import { Document } from "./Document";
import { Logo } from "./Logo";
import { Treasury } from "./Treasury";
import { ConnectButton } from "@/features/auction/components/ConnectButton";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type HeaderProps = {} & BaseProps;

/**
 * Header
 * @keit0728
 */
export const Header = ({ className }: HeaderProps) => {
  return (
    <header
      className={clsx(
        className,
        "pt-[8px]",
        "pb-[16px]",
        "bg-[#D5D7E1]",
        "px-[12px]",
        "flex",
        "justify-center",
        "items-center",
      )}
    >
      <div className={clsx("w-[1280px]", "flex", "justify-between")}>
        <div className={clsx("flex", "justify-center", "items-center")}>
          <Logo />
          <Treasury />
        </div>
        <div className={clsx("flex", "justify-center", "items-center")}>
          <Document />
          <ConnectButton
            className={clsx(
              "h-[40px]",
              "ml-[9px]",
              "text-[16px]",
              "border-[1px]",
              "border-solid",
              "border-[#bdc0cf]",
              "rounded-[10px]",
              "text-[#221b1a]",
              "px-[12px]",
              "py-[0]",
              "font-bold",
              "h-[40px]",
              "text-[16px]",
              "leading-[16px]",
              "font-['PT_Root_UI']",
              "font-bold",
            )}
          />
        </div>
      </div>
    </header>
  );
};
