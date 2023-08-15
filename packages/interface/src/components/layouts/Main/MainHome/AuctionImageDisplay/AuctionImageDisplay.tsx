import Link from "next/link";
import { AuctionImage } from "@/features/auction/components/AuctionImage";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type AuctionImageDisplayProps = {} & BaseProps;

/**
 * AuctionImageDisplay
 * @keit0728
 */
export const AuctionImageDisplay = ({
  className,
}: AuctionImageDisplayProps) => {
  return (
    <div className={clsx(className, "px-[12px]")}>
      <AuctionImage />
    </div>
  );
};
