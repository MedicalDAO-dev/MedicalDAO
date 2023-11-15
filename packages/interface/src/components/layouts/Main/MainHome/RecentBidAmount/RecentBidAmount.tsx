import { useAuctionValue } from "@/hooks/useAuction";
import { useUserValue } from "@/hooks/useUser";
import { BaseProps } from "@/types/BaseProps";
import { toFixedBigint } from "@/utils/util";
import clsx from "clsx";

export type RecentBidAmountProps = {} & BaseProps;

const BidAmount = ({ bidAmount }: { bidAmount: string }) => {
  return (
    <div className={clsx("font-['PT_Root_UI'] font-bold text-3xl")}>
      Ξ {bidAmount}
    </div>
  );
};

/**
 * RecentBidAmount
 * @YosukeMiyata
 */
export const RecentBidAmount = ({ className }: RecentBidAmountProps) => {
  const { address } = useUserValue();
  const auction = useAuctionValue();
  const currentBit = auction.getCurrentBid();

  return (
    <div className={clsx(className)}>
      <div className={clsx("mb-2", "text-lg font-bold text-[#79809c]")}>
        現在の入札額
      </div>
      <BidAmount
        bidAmount={
          (auction.isEndAuction() && !auction.isSuccessfulBidder(address)) ||
          !currentBit
            ? toFixedBigint(0n, 2)
            : toFixedBigint(currentBit.amount, 2)
        }
      />
    </div>
  );
};
