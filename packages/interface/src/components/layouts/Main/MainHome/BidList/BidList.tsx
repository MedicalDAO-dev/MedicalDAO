import { Divider } from "@/components/elements/Divider";
import { MAX_BID_LIST } from "@/const/const";
import { MoreBidListsButton } from "@/features/auction/components/MoreBidListsButton";
import { useAuctionValue } from "@/hooks/useAuction";
import { useUserValue } from "@/hooks/useUser";
import { BaseProps } from "@/types/BaseProps";
import { abbreviateAddress, toFixedBigint } from "@/utils/util";
import clsx from "clsx";
import { v4 as uuidv4 } from "uuid";

export type BidListProps = {} & BaseProps;

/**
 * BidList
 * @YosukeMiyata
 */
export const BidList = ({ className }: BidListProps) => {
  const { address } = useUserValue();
  const auction = useAuctionValue();
  const { bids } = auction;

  const handleClick = async () => {
    alert("click!");
  };

  if (auction.isEndAuction() && !auction.isSuccessfulBidder(address))
    return <></>;
  return (
    <div
      className={clsx(
        className,
        "flex flex-col justify-between",
        "w-[100%]",
        "font-['PT_Root_UI',sans-serif] font-bold",
      )}
    >
      <div className={clsx("mb-4")}>
        {bids
          .slice()
          .reverse()
          .map((bid, i) => {
            if (i >= MAX_BID_LIST) return <div key={uuidv4()}></div>;
            const { bidder, amount } = bid;
            return (
              <div key={uuidv4()}>
                <div className={clsx("flex justify-between", "my-4")}>
                  <div className={clsx("pl-2")}>
                    {abbreviateAddress(bidder)}
                  </div>
                  <div className={clsx("flex items-center", "pr-2")}>
                    <div className={clsx("mr-4")}>
                      Ξ {toFixedBigint(amount, 2)}
                    </div>
                  </div>
                </div>
                <Divider />
              </div>
            );
          })}
      </div>
      {bids.length > MAX_BID_LIST && <MoreBidListsButton />}
    </div>
  );
};
