import { BidList } from "../BidList";
import { DateSelection } from "../DateSelection";
import { InputBidAmount } from "../InputBidAmount";
import { NFTNameAndIndex } from "../NFTNameAndIndex";
import { TimeLimit } from "../TimeLimit";
import { Divider } from "@/components/elements/Divider";
import { Spinner } from "@/components/elements/Spinner";
import { RecentBidAmount } from "@/components/layouts/Main/MainHome/RecentBidAmount/RecentBidAmount";
import { AuctionImage } from "@/features/auction/components/AuctionImage";
import { SettleButton } from "@/features/auction/components/SettleButton";
import { useAuctionValue } from "@/hooks/useAuction";
import { useUserValue } from "@/hooks/useUser";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type IntroProps = {} & BaseProps;

export const Auction = ({ className }: IntroProps) => {
  const { address } = useUserValue();
  const auction = useAuctionValue();
  const { tokenId } = auction.nft;

  if (tokenId === 0n)
    return (
      <div
        className={clsx(
          "h-[512px]",
          "flex justify-center items-center",
          "mb-16",
        )}
      >
        <Spinner className={clsx("w-24 h-24", "border-8 border-gray-500")} />
      </div>
    );
  return (
    <div className={clsx(className, "flex", "mb-16")}>
      <AuctionImage className={clsx("mr-8")} />
      <div className={clsx("flex flex-col items-start min-w-430")}>
        <DateSelection className={clsx("mb-2")} />
        <NFTNameAndIndex className={clsx("mb-8")} />
        <div className={clsx("flex justify-between", "w-[100%]", "mb-4")}>
          <RecentBidAmount />
          <Divider orientation="vertical" />
          <TimeLimit />
        </div>
        {auction.isEndAuction() && auction.isSuccessfulBidder(address) ? (
          <div className={clsx("flex justify-end items-center", "w-[100%]")}>
            <SettleButton className={clsx("mb-4", "h-[54px]")} />
          </div>
        ) : (
          <InputBidAmount className={clsx("mb-4")} />
        )}
        <BidList />
      </div>
    </div>
  );
};
