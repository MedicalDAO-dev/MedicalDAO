import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type RecentBidAmountProps = {} & BaseProps;

/**
 * RecentBidAmount
 * @YosukeMiyata
 */
export const RecentBidAmount = ({ className }: RecentBidAmountProps) => {
  return (
    <div
      className={clsx(
        className,
        "flex-col",
        "mt-[6px]",
        "pr-[24px]",
        "[border-right:1px_solid_rgba(121,128,156,.28627450980392155)]",
      )}
    >
      <h4
        className={clsx(
          "mb-[8px]",
          "text-[18px]",
          "font-bold",
          "text-[#79809c]",
        )}
      >
        現在の入札額
      </h4>
      <div className={clsx("font-['PT_Root_UI'] font-bold text-3xl")}>
        Ξ 32.20
      </div>
    </div >
  );
};
