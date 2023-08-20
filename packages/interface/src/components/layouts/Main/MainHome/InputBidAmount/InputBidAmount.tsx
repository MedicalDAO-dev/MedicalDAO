import { BidButton } from "@/features/auction/components/BidButton";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type InputBidAmountProps = {} & BaseProps;

/**
 * InputBidAmount
 * @keit0728
 */
export const InputBidAmount = ({ className }: InputBidAmountProps) => {
  return (
    <div className={clsx(className)}>
      <div className="-mx-[12px]">
        <div className="flex px-[12px]">
          <div className="">
            <input
              type="text"
              id="first_name"
              className="h-[54px] w-[320px] text-[#D9DBE2] bg-[#fff] !rounded-[12px] !outline-[none] [box-shadow:none!important] font-['PT_Root_UI'] font-bold text-[20px] [transition:all_.2s_ease-in-out] block px-3 py-1.5 leading-normal bg-clip-padding appearance-none border-none "
              placeholder="Ξ 33.26 かそれ以上"
              required
            />
          </div>
          <div className="">
            <BidButton className="h-[54px] text-[16px] font-normal ml-[9px] bg-[#9fa0a3]" />
          </div>
        </div>
      </div>
    </div>
  );
};
