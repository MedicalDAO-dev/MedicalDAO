import { Londrina_Solid } from "next/font/google";
import Image from "next/image";
import { AuctionImage } from "@/features/auction/components/AuctionImage";
import { BidButton } from "@/features/auction/components/BidButton";
import { BidText } from "@/features/auction/components/BidText";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type MainHomeProps = {} & BaseProps;

/**
 * MainHome
 * @keit0728
 */

const LondrinaSolid_normal = Londrina_Solid({
  weight: "400",
  subsets: ["latin"],
});
const LondrinaSolid_bold = Londrina_Solid({
  weight: "900",
  subsets: ["latin"],
});

export const MainHome = ({ className }: MainHomeProps) => {
  return (
    <div className={clsx(className)}>
      <div className="bg-[#D5D7E1] w-screen ">
        <div className="mx-[30px] px-[12px] flex">
          <div className="px-[12px]">
            <AuctionImage />
          </div>
          <div className="pl-[12px] pr-[80px] flex-col justify-center">
            <div className="flex-col">
              <div className="flex">
                <div className="flex justify-center items-center">
                  <div className="flex">
                    <Image
                      src="/images/arrow_circle_left_72px.png"
                      alt="test"
                      width={36}
                      height={36}
                    />
                    <div className="mr-[5px]">
                      <Image
                        src="/images/arrow_circle_right_72px.png"
                        alt="test"
                        width={36}
                        height={36}
                      />
                    </div>
                  </div>
                  <h4 className="text-[#79809c]">2023年8月11日</h4>
                </div>
              </div>
              <div className="flex">
                <h1 className="font-[sans] mt-[4px] mb-[8px] text-[68px] text-[#151c3b]">
                  Noun 808
                </h1>
              </div>
            </div>
            <div className="flex -mx-[12px]">
              <div className="flex-col mt-[6px] ml-[6px] px-[12px]">
                <div className="mb-[8px] text-[18px] font-bold text-[#79809c]">
                  <h4>現在の入札額</h4>
                </div>
                <div className="font-['PT_Root_UI'] font-bold text-[32px] !mb-0 mt-[3px]">
                  Ξ 32.60
                </div>
              </div>
              <div className="flex-col mt-[5px] pl-[40px] pr-[12px]">
                <div className="mt-[1px] mb-[8px] text-[18px] font-bold text-[#79809c]">
                  <h4>オークション終了まで</h4>
                </div>
                <div className="font-['PT_Root_UI'] font-bold text-[32px] !mb-0 mt-[3px]">
                  5時間20分10秒
                </div>
              </div>
            </div>
            <div className="">
              <BidText />
            </div>
            <div className="">
              <BidText />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
