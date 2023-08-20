import Image from "next/image";
import Link from "next/link";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type NextMintProps = {} & BaseProps;

/**
 * NextMint
 * @keit0728
 */
export const NextMint = ({ className }: NextMintProps) => {
  return (
    <div className={clsx(className)}>
      <div className="-mx-[12px]">
        <div className="flex px-[12px] mb-[16px]">
          <div className="">
            <Image
              src="/images/info_icon_16px.png"
              alt="test"
              width={20}
              height={20}
            />
          </div>
          <div className="pl-[8px]">
            <a href="https://fomonouns.wtf" target="_blank" rel="noreferrer">
              次にミントされるNounの投票をしてください
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
