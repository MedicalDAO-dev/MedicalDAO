import { ChangeEvent } from "react";
import { BidButton } from "@/features/auction/components/BidButton";
import { useAuctionController } from "@/hooks/useAuction";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type InputBidAmountProps = {} & BaseProps;

/**
 * InputBidAmount
 * @YosukeMiyata
 */
export const InputBidAmount = ({ className }: InputBidAmountProps) => {
  const { setBidAmount } = useAuctionController();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBidAmount(e.target.value);
  };

  return (
    <div className={clsx(className, "flex")}>
      <input
        type="text"
        className={clsx(
          "mr-2",
          "w-[320px] h-[54px] rounded-[12px] px-3",
          "font-['PT_Root_UI'] font-bold text-[20px]",
        )}
        placeholder="Ξ 33.26 かそれ以上"
        onChange={handleChange}
      />
      <BidButton />
    </div>
  );
};
