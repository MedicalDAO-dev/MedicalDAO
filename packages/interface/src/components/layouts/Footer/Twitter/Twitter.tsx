import Image from "next/image";
import Link from "next/link";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type TwitterProps = {} & BaseProps;

/**
 * Twitter
 * @YosukeMiyata
 */
export const Twitter = ({ className }: TwitterProps) => {
  return (
    <div
      className={clsx(
        className,
        "no-underline",
        "text-[#000]",
        "mx-[14px]",
        "my-[8px]",
        "[transition:all_.15s_ease-in-out]",
      )}
    >
      Twitter
    </div>
  );
};
