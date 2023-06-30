import { auctionState } from "@/stores/auctionState";
import { BaseProps } from "@/types/BaseProps";
import Image from "next/image";
import { useRecoilValue } from "recoil";

export type AuctionImageProps = {} & BaseProps;

/**
 * AuctionImage
 * @keit0728
 */
export const AuctionImage = ({ className }: AuctionImageProps) => {
  const auction = useRecoilValue(auctionState);

  return <Image src={auction.imageURL} alt="test" width={512} height={512}/>;
};
