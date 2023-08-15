import Image from "next/image";
import Link from "next/link";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type TreasuryProps = {} & BaseProps;

/**
 * Treasury
 * @keit0728
 */
export const Treasury = ({ className }: TreasuryProps) => {
  return (
    <div className={clsx(className)}>
      <div className="px-[10px]">
        <a
          href="https://etherscan.io/tokenholdings?a=0x0BC3807Ec262cB779b38D65b38158acC3bfedE10"
          target="_blank"
          rel="noreferrer"
          className="font-['PT_Root_UI'] font-bold text-[.9rem] !p-[0.3rem] !text-[#000] block no-underline [transition:color_.15s_ease-in-out,background-color_.15s_ease-i"
        >
          <div className="border-[1px] border-solid border-[#bdc0cf] rounded-[10px] text-[#151c3b] h-[40px] text-[16px] font-['PT_Root_UI'] font-bold px-[10px] py-[0] [transition:all_.125s_ease-in-out] [box-shadow:none]">
            <div className="flex items-center justify-center h-full w-full">
              <div className="flex">
                <div className="text-[16px] mr-[0.4rem] mt-px">
                  トレジャリー
                </div>
                <div className="text-[16.5px] tracking-[.3px] ml-[0.4rem] mr-1">
                  Ξ 28,903
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};
