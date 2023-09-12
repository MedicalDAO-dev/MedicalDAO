import { useState } from "react";
import { BidList } from "../BidList";
import { DateSelection } from "../DateSelection";
import { InputBidAmount } from "../InputBidAmount";
import { NFTNameAndIndex } from "../NFTNameAndIndex";
import { NextMint } from "../NextMint";
import { RecentbidAmount } from "../RecentbidAmount";
import { TimeLimit } from "../TimeLimit";
import { AuctionImage } from "@/features/auction/components/AuctionImage";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type IntroProps = {} & BaseProps;

export const Auction = ({ className }: IntroProps) => {
  const [isAuction, setIsAuction] = useState(true);

  return (
    <div className={clsx(className)}>
      <div className={clsx("mx-[30px]", "px-[12px]", "flex")}>
        <div className={clsx("px-[12px]")}>
          <AuctionImage />
        </div>
        <div
          className={clsx(
            "pl-[24px]",
            "pr-[80px]",
            "flex-col",
            "justify-center",
            "mb-[8px]",
          )}
        >
          <div className={clsx("flex-col")}>
            <DateSelection />
            <NFTNameAndIndex />
          </div>
          <div>
            {isAuction ?
              (
                <div>
                  <div className={clsx("flex")}>
                    <RecentbidAmount />
                    <TimeLimit />
                  </div>
                  <NextMint />
                  <InputBidAmount />
                  <BidList />
                </div>
              ) :
              (
                <div>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  )
};