import { Button } from "@/components/elements/Button";
import { MIN_BID_AMOUNT } from "@/const/const";
import { useAuctionState } from "@/hooks/useAuction";
import { useIsDisableController } from "@/hooks/useIsDisable";
import { useUserValue } from "@/hooks/useUser";
import { BaseProps } from "@/types/BaseProps";
import { toFixedBigint } from "@/utils/util";
import clsx from "clsx";

export type BidButtonProps = {} & BaseProps;

/**
 * BidButton
 * @keit0728
 */
export const BidButton = ({ className }: BidButtonProps) => {
  const bidder = useUserValue();
  const [auction, { bid, settleAndCreateNewAuctionAndBid }] = useAuctionState();
  const isDisabledController = useIsDisableController();
  const currentBidAmount = auction.getCurrentBid()
    ? auction.getCurrentBid()?.amount ?? 0n
    : 0n;

  const handleClick = async () => {
    if (!bidder.isConnected()) {
      alert("ウォレットを接続してください");
      return;
    }
    if (auction.isEndAuction() && !auction.isSuccessfulBidder(bidder.address)) {
      if (bidder.bidAmount < MIN_BID_AMOUNT) {
        alert(
          `最低入札価格 ${toFixedBigint(
            MIN_BID_AMOUNT,
            2,
          )} 以上にしてください。`,
        );
        return;
      }
    } else {
      if (auction.isBelowMinimumBidAmount(bidder.bidAmount)) {
        alert(
          `最低入札価格 ${toFixedBigint(
            currentBidAmount + MIN_BID_AMOUNT,
            2,
          )} 以上にしてください。`,
        );
        return;
      }
    }
    try {
      isDisabledController.on();
      if (auction.isEndAuction()) {
        await settleAndCreateNewAuctionAndBid(bidder.bidAmount, bidder.address);
      } else {
        await bid(bidder.bidAmount, bidder.address);
      }
    } catch (e) {
      console.error(e);
      if (e instanceof Error) {
        alert("エラー\n理由: " + e.message);
      } else alert("エラー\n理由: " + e);
      isDisabledController.off();
      return;
    }
    isDisabledController.off();
  };

  return (
    <Button className={clsx(className)} theme="secondary" onClick={handleClick}>
      入札する
    </Button>
  );
};
