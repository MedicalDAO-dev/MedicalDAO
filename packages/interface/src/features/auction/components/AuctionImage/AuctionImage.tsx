import Image from "next/image";
import { auctionState } from "@/stores/auctionState";
import { BaseProps } from "@/types/BaseProps";
import { useRecoilValue } from "recoil";

export type AuctionImageProps = {} & BaseProps;

/**
 * AuctionImage
 * @keit0728
 */
export const AuctionImage = ({ className }: AuctionImageProps) => {
  const auction = useRecoilValue(auctionState);

  return <Image src={auction.imageURL} alt="test" width={550} height={550} />;
};
