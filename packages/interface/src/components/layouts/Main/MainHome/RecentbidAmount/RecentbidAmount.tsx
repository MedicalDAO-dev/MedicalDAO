import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type RecentBidAmountProps = {} & BaseProps;

/**
 * RecentBidAmount
 * @YosukeMiyata
 */
export const RecentBidAmount = ({ className }: RecentBidAmountProps) => {
  return (
    <div className={clsx(className)}>
      <div className={clsx("mb-2", "text-lg font-bold text-[#79809c]")}>
        現在の入札額
      </div>
      <div className={clsx("font-['PT_Root_UI'] font-bold text-3xl")}>
        Ξ 32.20
      </div>
    </div>
  );
};