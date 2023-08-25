import { BidButton } from "@/features/auction/components/BidButton";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";
// useAuction.tsからuseAuctionValueをimport
import { useAuctionController } from "@/hooks/useAuction";

export type InputBidAmountProps = {} & BaseProps;

/**
 * InputBidAmount
 * @YosukeMiyata
 */
export const InputBidAmount = ({ className }: InputBidAmountProps) => {
  const auctionController = useAuctionController();
  return (
    <div className={clsx(className, "-mx-[12px]")}>
      <div className={clsx("flex", "px-[12px]")}>
        <input
          type="text"
          id="bid_amount"
          className={clsx(
            "h-[54px]",
            "w-[320px]",
            "text-[#D9DBE2]",
            "bg-[#fff]",
            "rounded-[12px]",
            "outline-[none]",
            "font-['PT_Root_UI']",
            "font-bold text-[20px]",
            "block",
            "px-3",
            "py-1.5",
            "leading-normal",
            "bg-clip-padding",
            "appearance-none",
            "border-none",
          )}
          placeholder="Ξ 33.26 かそれ以上"
          required
        />
        <BidButton
          className={clsx(
            "h-[54px]",
            "text-[16px]",
            "font-normal",
            "ml-[9px]",
            "bg-[#9fa0a3]",
          )}
        />
      </div>
    </div>
  );
};
