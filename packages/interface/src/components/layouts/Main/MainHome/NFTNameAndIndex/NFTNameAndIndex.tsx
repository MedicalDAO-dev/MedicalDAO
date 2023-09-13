import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type NFTNameAndIndexProps = {} & BaseProps;

/**
 * NFTNameAndIndex
 * @YosukeMiyata
 */
export const NFTNameAndIndex = ({ className }: NFTNameAndIndexProps) => {
  return (
    <div
      className={clsx(
        className,
        "font-['Londrina_Solid'] text-7xl text-[#151c3b]",
      )}
    >
      Noun 808
    </div>
  );
};
