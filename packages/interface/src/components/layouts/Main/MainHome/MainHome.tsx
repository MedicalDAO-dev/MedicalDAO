import Image from "next/image";
import { AuctionImageDisplay } from "./AuctionImageDisplay";
import { BidList } from "./BidList";
import { DateSelection } from "./DateSelection";
import { InputBidAmount } from "./InputBidAmount";
import { NFTNameAndIndex } from "./NFTNameAndIndex";
import { NextMint } from "./NextMint";
import { Outline } from "./Outline";
import { RecentbidAmount } from "./RecentbidAmount";
import { TimeLimit } from "./TimeLimit";
import { BidText } from "@/features/auction/components/BidText";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type MainHomeProps = {} & BaseProps;

/**
 * MainHome
 * @keit0728
 */

export const MainHome = ({ className }: MainHomeProps) => {
  return (
    <div className={clsx(className)}>
      <div
        className={clsx(
          "bg-[#D5D7E1]",
          "flex",
          "justify-center",
          "items-center",
        )}
      >
        <div className={clsx("w-[1280px]")}>
          <div className={clsx("mx-[30px]", "px-[12px]", "flex")}>
            <AuctionImageDisplay />
            <div
              className={clsx(
                "pl-[12px]",
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
              <div className={clsx("flex", "-mx-[12px]")}>
                <RecentbidAmount />
                <TimeLimit />
              </div>

              <NextMint />
              <InputBidAmount />
              <BidList />
            </div>
          </div>
          <div
            className={clsx(
              "px-[0]",
              "py-16",
              "flex",
              "justify-center",
              "items-center",
            )}
          >
            <div
              className={clsx(
                "w-[1140px]",
                "px-[12px]",
                "mx-[70px]",
                "items-center",
                "-mx-[12px]",
                "ml-[95px]",
                "px-[12px]",
              )}
            >
              <Outline />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
