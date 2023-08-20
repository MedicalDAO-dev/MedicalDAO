import Image from "next/image";
import Link from "next/link";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type BidListProps = {} & BaseProps;

/**
 * BidList
 * @keit0728
 */
export const BidList = ({ className }: BidListProps) => {
  return (
    <div className={clsx(className)}>
      <div className="-mx-[12px]">
        <div className="flex-col mx-[12px]">
          <div className="">
            <ul className="my-[16px]">
              <li className="flex items-center justify-between p-[13px] font-['PT_Root_UI',sans-serif] font-bold [transition:all_.2s_ease-in-out] [border-bottom:1px_solid_#C6C8D8]">
                <div className="flex">
                  <svg width="24px" height="24px">
                    <rect
                      x="0"
                      y="0"
                      width="24"
                      height="24"
                      fill="#035A5D"
                      transform="translate(0.8408906370506414 -4.291976388065376) rotate(395.6 12 12)"
                    ></rect>
                    <rect
                      x="0"
                      y="0"
                      width="24"
                      height="24"
                      fill="#247BE1"
                      transform="translate(-6.472747947319047 -10.89489149082615) rotate(274.0 12 12)"
                    ></rect>
                    <rect
                      x="0"
                      y="0"
                      width="24"
                      height="24"
                      fill="#F72201"
                      transform="translate(0.4293922898176871 19.82216426921413) rotate(125.2 12 12)"
                    ></rect>
                  </svg>
                  <div className="ml-[10px]">0xAa...2977</div>
                </div>
                <div className="flex">
                  <div className="mr-4 pt-[2px]">Ξ 32.60</div>
                  <div className="">
                    <Image
                      src="/images/link_icon_64px.png"
                      alt="test"
                      width={24}
                      height={24}
                    />
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="flex justify-center ">
            <div className="pb-4 ml-2 font-['PT_Root_UI'] font-bold text-[16px] text-[#79809c]">
              すべての入札を表示
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
