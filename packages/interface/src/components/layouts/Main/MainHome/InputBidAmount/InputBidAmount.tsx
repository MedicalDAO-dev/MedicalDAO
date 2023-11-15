import { ChangeEvent } from "react";
import { MIN_BID_AMOUNT } from "@/const/const";
import { BidButton } from "@/features/auction/components/BidButton";
import { useAuctionValue } from "@/hooks/useAuction";
import { useUserController, useUserValue } from "@/hooks/useUser";
import { BaseProps } from "@/types/BaseProps";
import { toFixedBigint } from "@/utils/util";
import clsx from "clsx";
import { parseEther } from "viem";

export type InputBidAmountProps = {} & BaseProps;

/**
 * InputBidAmount
 * @YosukeMiyata
 */
export const InputBidAmount = ({ className }: InputBidAmountProps) => {
  const { address } = useUserValue();
  const auction = useAuctionValue();
  const { update } = useUserController();
  const currentBit = auction.getCurrentBid();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    update({ bidAmount: parseEther(e.target.value) });
  };

  return (
    <div className={clsx(className, "flex")}>
      <input
        type="number"
        className={clsx(
          "mr-2",
          "w-[320px] h-[54px] rounded-[12px] px-3",
          "font-['PT_Root_UI'] font-bold text-[20px]",
        )}
        placeholder={`Ξ ${
          (auction.isEndAuction() && !auction.isSuccessfulBidder(address)) ||
          !currentBit
            ? toFixedBigint(MIN_BID_AMOUNT, 2)
            : toFixedBigint(currentBit?.amount + MIN_BID_AMOUNT, 2)
        } 以上`}
        onChange={handleChange}
      />
      <BidButton />
    </div>
  );
};
