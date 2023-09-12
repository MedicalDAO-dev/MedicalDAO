import { Button } from "@/components/elements/Button";
import { useAuctionController } from "@/hooks/useAuction";
import { auctionState } from "@/stores/auctionState";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";
import { useRecoilValue } from "recoil";

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
