import Image from "next/image";
import { BidButton } from "@/features/auction/components/BidButton";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type HeaderProps = {} & BaseProps;

/**
 * Header
 * @keit0728
 */
export const Header = ({ className }: HeaderProps) => {
  return (
    <header className={clsx(className)}>
      <div className="pt-[8px] pb-[16px] w-screen bg-[#D5D7E1] px-[12px] flex justify-between">
        <div className="flex justify-center items-center">
          <div className="py-[8px] mr-[16px]">
            <Image src="/images/icon.jpg" alt="test" width={90} height={90} />
          </div>
          <div className="">
            <BidButton />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="mr-[16px]">
            <BidButton />
          </div>
          <div className="">
            <BidButton />
          </div>
        </div>
      </div>
    </header>
  );
};
