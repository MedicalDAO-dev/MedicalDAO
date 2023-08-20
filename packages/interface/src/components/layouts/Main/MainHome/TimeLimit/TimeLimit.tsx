import Image from "next/image";
import Link from "next/link";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type TimeLimitProps = {} & BaseProps;

/**
 * TimeLimit
 * @keit0728
 */
export const TimeLimit = ({ className }: TimeLimitProps) => {
  return (
    <div className={clsx(className)}>
      <div className="-mx-[12px]">
        <div className="flex-col mt-[5px] pl-[40px] pr-[12px]">
          <div className="mt-[1px] mb-[8px] text-[18px] font-bold text-[#79809c]">
            <h4>オークション終了まで</h4>
          </div>
          <div className="font-['PT_Root_UI'] font-bold text-[32px] !mb-0 mt-[3px]">
            5時間20分10秒
          </div>
        </div>
      </div>
    </div>
  );
};
