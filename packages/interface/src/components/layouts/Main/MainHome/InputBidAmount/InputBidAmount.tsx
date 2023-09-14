import { ChangeEvent } from "react";
import { MIN_BID_AMOUNT } from "@/const/const";
import { BidButton } from "@/features/auction/components/BidButton";
import { useAuctionValue } from "@/hooks/useAuction";
import { useUserController } from "@/hooks/useUser";
import { BaseProps } from "@/types/BaseProps";
import { toFixedBigint } from "@/utils/util";
import clsx from "clsx";

export type InputBidAmountProps = {} & BaseProps;

/**
 * InputBidAmount
 * @YosukeMiyata
 */
export const InputBidAmount = ({ className }: InputBidAmountProps) => {
  const currentBit = useAuctionValue().getCurrentBid();
  const { update } = useUserController();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    update({ bidAmount: BigInt(e.target.value) });
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
          currentBit
            ? toFixedBigint(currentBit?.amount + MIN_BID_AMOUNT, 2)
            : toFixedBigint(MIN_BID_AMOUNT, 2)
        } 以上`}
        onChange={handleChange}
      />
      <BidButton />
    </div>
  );
};
