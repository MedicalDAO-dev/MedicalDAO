import { INITIAL_BID_AMOUNT } from "@/const/const";
import { useAuctionValue } from "@/hooks/useAuction";
import { BaseProps } from "@/types/BaseProps";
import { toFixedBigint } from "@/utils/util";
import clsx from "clsx";

export type RecentBidAmountProps = {} & BaseProps;

/**
 * RecentBidAmount
 * @YosukeMiyata
 */
export const RecentBidAmount = ({ className }: RecentBidAmountProps) => {
  const currentBit = useAuctionValue().getCurrentBid();

  return (
    <div className={clsx(className)}>
      <div className={clsx("mb-2", "text-lg font-bold text-[#79809c]")}>
        現在の入札額
      </div>
      <div className={clsx("font-['PT_Root_UI'] font-bold text-3xl")}>
        Ξ{" "}
        {currentBit
          ? toFixedBigint(currentBit.amount, 2)
          : toFixedBigint(INITIAL_BID_AMOUNT, 2)}
      </div>
    </div>
  );
};
