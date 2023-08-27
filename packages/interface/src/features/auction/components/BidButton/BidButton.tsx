import { Button } from "@/components/elements/Button";
import { useAuctionController } from "@/hooks/useAuction";
import { BaseProps } from "@/types/BaseProps";
import { auctionState } from "@/stores/auctionState";
import { useRecoilValue } from "recoil";
import clsx from "clsx";

export type BidButtonProps = {} & BaseProps;

/**
 * BidButton
 * @keit0728
 */
export const BidButton = ({ className }: BidButtonProps) => {
  const auctionController = useAuctionController();
  const auctionData = useRecoilValue(auctionState);
  const { bidder, bidAmount } = auctionData;

  const handleClick = async () => {
    console.log("bidder: ", bidder);
    console.log("bidAmount: ", bidAmount);
    await auctionController.bid(bidder, bidAmount);
  };

  return (
    <Button className={clsx(className)} color="secondary" onClick={handleClick}>
      入札をする
    </Button>
  );
};
