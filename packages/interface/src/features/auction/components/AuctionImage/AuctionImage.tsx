import Image from "next/image";
import { BASE_NFT_IMAGE_URL } from "@/const/const";
import { useUserValue } from "@/hooks/useUser";
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
  const { address } = useUserValue();
  const auction = useRecoilValue(auctionState);
  const { imageURL, tokenId } = auction.nft;

  if (imageURL === "") return <></>;
  if (!auction.isEndAuction() || auction.isSuccessfulBidder(address))
    return (
      <Image
        className={clsx(className)}
        src={imageURL}
        alt="auctionImage"
        width={512}
        height={512}
        priority
      />
    );
  return (
    <Image
      className={clsx(className)}
      src={`${BASE_NFT_IMAGE_URL}/${Number(tokenId + 1n)}.png`}
      alt="auctionImage"
      width={512}
      height={512}
      priority
    />
  );
};
