import { auctionState } from "@/stores/auctionState";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";
import { useRecoilValue } from "recoil";

export type NFTNameAndIndexProps = {} & BaseProps;

/**
 * NFTNameAndIndex
 * @YosukeMiyata
 */
export const NFTNameAndIndex = ({ className }: NFTNameAndIndexProps) => {
  const auction = useRecoilValue(auctionState);

  return (
    <div
      className={clsx(
        className,
        "font-['Londrina_Solid'] text-7xl text-[#151c3b]",
      )}
    >
      Token {Number(auction.tokenId)}
    </div>
  );
};
