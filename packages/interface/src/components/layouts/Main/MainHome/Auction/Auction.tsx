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
import { useAuctionValue } from "@/hooks/useAuction";
import { useEffect, useState } from "react";

export type IntroProps = {} & BaseProps;

export const Auction = ({ className }: IntroProps) => {
  const { tokenId } = useAuctionValue().nft;
  const { endTime } = useAuctionValue();
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDateTime = Math.floor(Date.now() / 1000);

      if (endTime !== 0n && currentDateTime !== 0) {
        setDuration(Number(endTime) - currentDateTime);
      } else {
        setDuration(0);
      }
    }, 1000);

    // コンポーネントがアンマウントされたときのクリーンアップ関数
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={clsx(className, "flex", "mb-16")}>
      <AuctionImage className={clsx("mr-8")} />
      <div className={clsx("flex flex-col items-start min-w-430")}>
        {tokenId !== 0n &&
          <>
            {/* 暫定的に適当な値を入れて、必ずオークションの画面が表示されるようにしています */}
            {duration !== 1234 ? (
              <>
                <DateSelection className={clsx("mb-2")} />
                <NFTNameAndIndex className={clsx("mb-8")} />
                <div className={clsx("flex justify-between", "w-[100%]", "mb-4")}>
                  <RecentBidAmount />
                  <Divider orientation="vertical" />
                  <TimeLimit duration={duration} />
                </div>
                <InputBidAmount className={clsx("mb-4")} />
                <BidList />
              </>
            ) : (
              <>
                TODO：オークション終了後の処理を書く
              </>)}
          </>
        }
      </div>
    </div>
  )
};