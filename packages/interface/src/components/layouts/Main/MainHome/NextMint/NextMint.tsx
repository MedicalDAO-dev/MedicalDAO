import Image from "next/image";
import Link from "next/link";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type NextMintProps = {} & BaseProps;

/**
 * NextMint
 * @YosukeMiyata
 */
export const NextMint = ({ className }: NextMintProps) => {
  return (
    <div className={clsx(className, "-mx-[12px]")}>
      <div
        className={clsx("flex", "flex items-center", "px-[12px]", "mb-[16px]")}
      >
        <Image
          src="/images/info_icon_16px.png"
          alt="test"
          width={20}
          height={20}
        />
        <Link
          href="https://fomonouns.wtf"
          target="_blank"
          rel="noreferrer"
          className={clsx("pl-[8px]")}
        >
          次にミントされるNounの投票をしてください
        </Link>
      </div>
    </div>
  );
};
