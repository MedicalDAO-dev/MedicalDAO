import { AuctionImage } from "@/features/auction/components/AuctionImage";
import { BidButton } from "@/features/auction/components/BidButton";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type MainHomeProps = {} & BaseProps;

/**
 * MainHome
 * @keit0728
 */
export const MainHome = ({ className }: MainHomeProps) => {
  return (
    <div className={clsx(className)}>
      <AuctionImage />
      main homeだよ!
      <BidButton />
    </div>
  );
};
