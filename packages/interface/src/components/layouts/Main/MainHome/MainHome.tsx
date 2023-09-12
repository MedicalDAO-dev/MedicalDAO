import { useEffect, useState } from "react";
import { Auction } from "@/components/layouts/Main/MainHome/Auction";
import { Outline } from "./Outline";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type MainHomeProps = {} & BaseProps;

/**
 * MainHome
 * @keit0728
 */

export const MainHome = ({ className }: MainHomeProps) => {
  const lastAuctionNounId = 0;
  const [onDisplayAuctionTokenId, setOnDisplayAuctionTokenId] = useState(lastAuctionNounId);

  useEffect(() => {

  }, [onDisplayAuctionTokenId]);

  return (
    <div className={clsx(className)}>
      <div
        className={clsx(
          "bg-[#D5D7E1]",
          "flex",
          "justify-center",
          "items-center",
        )}
      >
        <div className={clsx("w-[1280px]")}>
          <Auction />
          <Outline />
        </div>
      </div>
    </div>
  );
};
