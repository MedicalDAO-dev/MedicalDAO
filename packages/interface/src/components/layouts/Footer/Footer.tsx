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
      <div className="mx-[30px] px-[12px] flex justify-center items-center">
        <div className="mx-[417px] pt-[32px] pb-[64px] flex justify-center items-center">
          <div className="no-underline text-[#000] mx-[14px] my-[8px] [transition:all_.15s_ease-in-out]">
            Twitter
          </div>
          <div className="no-underline text-[#000] mx-[14px] my-[8px] [transition:all_.15s_ease-in-out]">
            Etherscan
          </div>
          <div className="no-underline text-[#000] mx-[14px] my-[8px] [transition:all_.15s_ease-in-out]">
            Forum
          </div>
        </div>
      </div>
    </footer>
  );
};
