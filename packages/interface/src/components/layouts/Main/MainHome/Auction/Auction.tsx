import { BidList } from "../BidList";
import { DateSelection } from "../DateSelection";
import { InputBidAmount } from "../InputBidAmount";
import { NFTNameAndIndex } from "../NFTNameAndIndex";
import { TimeLimit } from "../TimeLimit";
import { AuctionImage } from "@/features/auction/components/AuctionImage";
import { BaseProps } from "@/types/BaseProps";
import { RecentBidAmount } from "@/components/layouts/Main/MainHome/RecentBidAmount/RecentBidAmount";
import { Divider } from "@/components/elements/Divider";
import clsx from "clsx";
import TimeUpdater from "@/components/layouts/Main/MainHome/TimeUpdater/TimeUpdater";
import { useAuctionValue } from "@/hooks/useAuction";

export type IntroProps = {} & BaseProps;

export const Auction = ({ className }: IntroProps) => {
  const { tokenId } = useAuctionValue();

  return (
    <div className={clsx("flex", "mb-16")}>
      <TimeUpdater />
      <AuctionImage className={clsx("mr-8")} />
      <div className={clsx("flex flex-col items-start min-w-430")}>
        {tokenId !== 0n && <div>
          <DateSelection className={clsx("mb-2")} />
          <NFTNameAndIndex className={clsx("mb-8")} />
          <div className={clsx("flex justify-between", "w-[100%]", "mb-4")}>
            <RecentBidAmount />
            <Divider orientation="vertical" />
            <TimeLimit />
          </div>
          <InputBidAmount className={clsx("mb-4")} />
          <BidList />
        </div>}
      </div>
    </div>
  )
};