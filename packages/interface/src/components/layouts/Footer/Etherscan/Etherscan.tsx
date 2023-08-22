import Image from "next/image";
import Link from "next/link";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type EtherscanProps = {} & BaseProps;

/**
 * Etherscan
 * @YosukeMiyata
 */
export const Etherscan = ({ className }: EtherscanProps) => {
  return (
    <div
      className={clsx(
        className,
        "no-underline",
        "text-[#000]",
        "mx-[14px]",
        "my-[8px]",
      )}
    >
      <Link href="">Etherscan</Link>
    </div>
  );
};
