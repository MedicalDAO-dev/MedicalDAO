import { useEffect, useState } from "react";
import { useAuctionValue } from "@/hooks/useAuction";
import { useUserValue } from "@/hooks/useUser";
import { AuctionModel } from "@/models/AuctionModel";
import { BaseProps } from "@/types/BaseProps";
import { remainUnixTime } from "@/utils/util";
import clsx from "clsx";
import { Address } from "wagmi";

export type TimeLimitProps = {} & BaseProps;

/**
 * TimeLimit
 * @YosukeMiyata
 */
export const TimeLimit = ({ className }: TimeLimitProps) => {
  const { address } = useUserValue();
  const auction = useAuctionValue();
  const [unixTime, setUnixTime] = useState(0);
  const { endTime } = auction;

  useEffect(() => {
    if (endTime === 0n) return;
    const interval = setInterval(() => {
      const currentDateTime = Math.floor(Date.now() / 1000);
      setUnixTime(Number(endTime) - currentDateTime);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={clsx(className, "font-bold")}>
      <div className={clsx("mb-2", "text-lg text-[#79809c]")}>
        オークション終了まで
      </div>
      <div className={clsx("font-['PT_Root_UI'] text-3xl")}>
        {_getDurationStr(auction, address, unixTime)}
      </div>
    </div>
  );
};

const _getDurationStr = (
  auction: AuctionModel,
  address: Address,
  duration: number,
): string => {
  if (!auction.isEndAuction()) return remainUnixTime(duration);
  if (auction.isSuccessfulBidder(address)) return "入札終了";
  return "未入札";
};
