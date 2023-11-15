import { useState } from "react";
import { Button } from "@/components/elements/Button";
import { MIN_BID_AMOUNT } from "@/const/const";
import { useAuctionState } from "@/hooks/useAuction";
import { useIsDisableState } from "@/hooks/useIsDisable";
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
  const [disabled, { on: onDisabled, off: offDisabled }] = useIsDisableState();
  const [loading, setLoading] = useState(false);
  const [auction, { bid, settleAndCreateNewAuctionAndBid }] = useAuctionState();
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
      onDisabled();
      setLoading(true);
      if (auction.isEndAuction()) {
        await settleAndCreateNewAuctionAndBid(bidder.bidAmount);
      } else {
        await bid(bidder.bidAmount);
      }
    } catch (e) {
      console.error(e);
      if (e instanceof Error) {
        alert("エラー\n理由: " + e.message);
      } else alert("エラー\n理由: " + e);
      offDisabled();
      setLoading(false);
      return;
    }
    offDisabled();
    setLoading(false);
  };

  return (
    <Button
      className={clsx(className)}
      disabled={disabled}
      loading={loading}
      theme="secondary"
      onClick={handleClick}
    >
      入札する
    </Button>
  );
};
