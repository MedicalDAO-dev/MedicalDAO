import { useState } from "react";
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

export type IntroProps = {} & BaseProps;

export const Auction = ({ className }: IntroProps) => {
  const [isAuction, setIsAuction] = useState(true);

  return (
    <div className={clsx("flex", "mb-16")}>
      <AuctionImage className={clsx("mr-8")} />
      <div className={clsx("flex flex-col items-start")}>
        <DateSelection className={clsx("mb-2")} />
        <NFTNameAndIndex className={clsx("mb-8")} />
        <div className={clsx("flex justify-between", "w-[100%]", "mb-4")}>
          <RecentBidAmount />
          <Divider orientation="vertical" />
          <TimeLimit />
        </div>
        <InputBidAmount className={clsx("mb-4")} />
        <BidList />
      </div>
    </div>
  )
};