import { Auction } from "@/components/layouts/Main/MainHome/Auction";
import { Outline } from "@/components/layouts/Main/MainHome/Outline";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type MainHomeProps = {} & BaseProps;

/**
 * MainHome
 * @keit0728
 */

export const MainHome = ({ className }: MainHomeProps) => {
  return (
    <div
      className={clsx(className, "flex flex-col justify-center items-center")}
    >
      <Auction />
      <Outline />
    </div>
  );
};
