import Image from "next/image";
import Link from "next/link";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type ForumProps = {} & BaseProps;

/**
 * Forum
 * @YosukeMiyata
 */
export const Forum = ({ className }: ForumProps) => {
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
      Forum
    </div>
  );
};
