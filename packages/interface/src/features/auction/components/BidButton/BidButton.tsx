import { Button } from "@/components/elements/Button";
import { useAuctionController } from "@/hooks/useAuction";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type BidButtonProps = {} & BaseProps;

/**
 * BidButton
 * @keit0728
 */
export const BidButton = ({ className }: BidButtonProps) => {
  const auctionController = useAuctionController();

  const handleClick = async () => {
    alert("入札!");
    await auctionController.bid();
  };

  return (
    <Button className={clsx(className)} color="secondary" onClick={handleClick}>
      入札をする
    </Button>
  );
};
