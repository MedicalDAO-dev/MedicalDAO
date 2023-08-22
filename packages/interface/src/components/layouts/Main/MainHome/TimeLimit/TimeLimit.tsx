import Image from "next/image";
import Link from "next/link";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type TimeLimitProps = {} & BaseProps;

/**
 * TimeLimit
 * @YosukeMiyata
 */
export const TimeLimit = ({ className }: TimeLimitProps) => {
  return (
    <div
      className={clsx(
        className,
        "-mx-[12px]",
        "flex-col",
        "mt-[5px]",
        "pl-[40px]",
        "pr-[12px]",
      )}
    >
      <h4
        className={clsx(
          "mt-[1px]",
          "mb-[8px]",
          "text-[18px]",
          "font-bold",
          "text-[#79809c]",
        )}
      >
        オークション終了まで
      </h4>
      <div
        className={clsx(
          "font-['PT_Root_UI']",
          "font-bold",
          "text-[32px]",
          "mb-0",
          "mt-[3px]",
        )}
      >
        5時間20分10秒
      </div>
    </div>
  );
};
