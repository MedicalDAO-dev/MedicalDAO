import { Button } from "@/components/elements/Button";
import { useAuctionState } from "@/hooks/useAuction";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type BidButtonProps = {} & BaseProps;

/**
 * BidButton
 * @keit0728
 */
export const BidButton = ({ className }: BidButtonProps) => {
  const [{ bidder, bidAmount }, { bid }] = useAuctionState();

  const handleClick = async () => {
    await bid(bidder, bidAmount);
  };

  return (
    <Button className={clsx(className)} theme="secondary" onClick={handleClick}>
      入札をする
    </Button>
  );
};
