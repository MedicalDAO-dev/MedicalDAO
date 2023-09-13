import { Divider } from "@/components/elements/Divider";
import { BidList } from "@/components/layouts/Main/MainHome/BidList";
import { DateSelection } from "@/components/layouts/Main/MainHome/DateSelection";
import { InputBidAmount } from "@/components/layouts/Main/MainHome/InputBidAmount";
import { NFTNameAndIndex } from "@/components/layouts/Main/MainHome/NFTNameAndIndex";
import { Outline } from "@/components/layouts/Main/MainHome/Outline";
import { RecentBidAmount } from "@/components/layouts/Main/MainHome/RecentbidAmount/RecentbidAmount";
import { TimeLimit } from "@/components/layouts/Main/MainHome/TimeLimit";
import { AuctionImage } from "@/features/auction/components/AuctionImage";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type MainHomeProps = {} & BaseProps;

/**
 * MainHome
 * @keit0728
 */

export const MainHome = ({ className }: MainHomeProps) => {
  return (
    <div
      className={clsx(className, "flex flex-col justify-center items-center")}
    >
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
      <Outline />
    </div>
  );
};