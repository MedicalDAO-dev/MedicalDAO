import { auctionState } from "@/stores/auctionState";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";
import { useRecoilValue } from "recoil";

export type BidTextProps = {} & BaseProps;

/**
 * BidText
 * @keit0728
 */
export const BidText = ({ className }: BidTextProps) => {
  const auction = useRecoilValue(auctionState);

  return (
    <div className={clsx(className, "text-[32px]", "font-bold")}>
      {auction.bidder}: {auction.bidAmount}
    </div>
  );
};
