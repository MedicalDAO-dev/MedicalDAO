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
  const [auction, { bid }] = useAuctionState();
  const isDisabledController = useIsDisableController();
  const currentBidAmount = auction.getCurrentBid()
    ? auction.getCurrentBid()?.amount ?? 0n
    : 0n;

  const handleClick = async () => {
    if (!bidder.isConnected()) {
      alert("ウォレットを接続してください");
      return;
    }
    if (auction.isBelowMinimumBidAmount(currentBidAmount)) {
      alert(
        `最低入札価格 ${toFixedBigint(
          currentBidAmount + MIN_BID_AMOUNT,
          2,
        )} 以上にしてください。`,
      );
      return;
    }
    try {
      isDisabledController.on();
      await bid(bidder.bidAmount);
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
      入札をする
    </Button>
  );
};
