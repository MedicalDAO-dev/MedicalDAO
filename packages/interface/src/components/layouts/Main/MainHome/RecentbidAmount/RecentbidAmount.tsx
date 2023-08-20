import Image from "next/image";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type RecentbidAmountProps = {} & BaseProps;

/**
 * RecentbidAmount
 * @keit0728
 */
export const RecentbidAmount = ({ className }: RecentbidAmountProps) => {
  return (
    <div className={clsx(className)}>
      <div className="flex-col mt-[6px] ml-[6px] pr-[24px] pl-[12px] [border-right:1px_solid_rgba(121,128,156,.28627450980392155)]">
        <div className="mb-[8px] text-[18px] font-bold text-[#79809c]">
          <h4>現在の入札額</h4>
        </div>
        <div className="font-['PT_Root_UI'] font-bold text-[32px] !mb-0 mt-[3px]">
          Ξ 32.60
        </div>
      </div>
    </div>
  );
};
