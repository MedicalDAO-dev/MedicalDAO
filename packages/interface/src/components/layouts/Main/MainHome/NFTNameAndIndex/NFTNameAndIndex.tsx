import { useAuctionValue } from "@/hooks/useAuction";
import { useUserValue } from "@/hooks/useUser";
import { AuctionModel } from "@/models/AuctionModel";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";
import { Address } from "wagmi";

export type NFTNameAndIndexProps = {} & BaseProps;

/**
 * NFTNameAndIndex
 * @YosukeMiyata
 */
export const NFTNameAndIndex = ({ className }: NFTNameAndIndexProps) => {
  const auction = useAuctionValue();
  const { address } = useUserValue();

  return (
    <div
      className={clsx(
        className,
        "font-['Londrina_Solid'] text-7xl text-[#151c3b]",
      )}
    >
      Token {_getTokenId(auction, address)}
    </div>
  );
};

const _getTokenId = (auction: AuctionModel, address: Address): number => {
  const { tokenId } = auction.nft;
  if (!auction.isEndAuction()) return Number(tokenId);
  if (auction.isSuccessfulBidder(address)) return Number(tokenId);
  return Number(tokenId + 1n);
};
