import { Connection } from "./Connection";
import { Document } from "./Document";
import { Logo } from "./Logo";
import { Treasury } from "./Treasury";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type HeaderProps = {} & BaseProps;

/**
 * Header
 * @keit0728
 */
export const Header = ({ className }: HeaderProps) => {
  return (
    <header className={clsx(className)}>
      <div className="pt-[8px] pb-[16px] bg-[#D5D7E1] px-[12px] flex justify-center items-center">
        <div className="w-[1280px] flex justify-between">
          <div className="flex justify-center items-center">
            <Logo />
            <Treasury />
          </div>
          <div className="flex justify-center items-center">
            <Document />
            <Connection />
          </div>
        </div>
      </div>
    </header>
  );
};
