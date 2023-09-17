import Image from "next/image";
import { auctionState } from "@/stores/auctionState";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";
import { useRecoilValue } from "recoil";

export type AuctionImageProps = {} & BaseProps;

/**
 * AuctionImage
 * @keit0728
 */
export const AuctionImage = ({ className }: AuctionImageProps) => {
  const auction = useRecoilValue(auctionState);

  return (
    <Image
      className={clsx(className)}
      src={auction.nft.imageURL}
      alt="auctionImage"
      width={512}
      height={512}
      priority
    />
  );
};
