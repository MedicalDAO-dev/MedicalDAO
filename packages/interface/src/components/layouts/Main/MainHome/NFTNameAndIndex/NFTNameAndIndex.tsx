import Image from "next/image";
import Link from "next/link";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type NFTNameAndIndexProps = {} & BaseProps;

/**
 * NFTNameAndIndex
 * @keit0728
 */
export const NFTNameAndIndex = ({ className }: NFTNameAndIndexProps) => {
  return (
    <div className={clsx(className, "flex")}>
      <h1 className="font-['Londrina_Solid'] mt-[4px] mb-[8px] text-[68px] text-[#151c3b]">
        Noun 808
      </h1>
    </div>
  );
};
