import Image from "next/image";
import { AuctionImageDisplay } from "./AuctionImageDisplay";
import { DateSelection } from "./DateSelection";
import { BidButton } from "@/features/auction/components/BidButton";
import { BidText } from "@/features/auction/components/BidText";
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
      <div className="bg-[#D5D7E1] flex justify-center items-center">
        <div className="w-[1280px] ">
          <div className="mx-[30px] px-[12px] flex">
            <AuctionImageDisplay />
            <div className="pl-[12px] pr-[80px] flex-col justify-center">
              <div className="mb-[8px]">
                <div className="flex-col">
                  <DateSelection />
                  <div className="flex">
                    <h1 className="font-['Londrina_Solid'] mt-[4px] mb-[8px] text-[68px] text-[#151c3b]">
                      Noun 808
                    </h1>
                  </div>
                </div>
                <div className="flex -mx-[12px]">
                  <div className="flex-col mt-[6px] ml-[6px] pr-[24px] pl-[12px] [border-right:1px_solid_rgba(121,128,156,.28627450980392155)]">
                    <div className="mb-[8px] text-[18px] font-bold text-[#79809c]">
                      <h4>現在の入札額</h4>
                    </div>
                    <div className="font-['PT_Root_UI'] font-bold text-[32px] !mb-0 mt-[3px]">
                      Ξ 32.60
                    </div>
                  </div>
                  <div className="-mx-[12px]">
                    <div className="flex-col mt-[5px] pl-[40px] pr-[12px]">
                      <div className="mt-[1px] mb-[8px] text-[18px] font-bold text-[#79809c]">
                        <h4>オークション終了まで</h4>
                      </div>
                      <div className="font-['PT_Root_UI'] font-bold text-[32px] !mb-0 mt-[3px]">
                        5時間20分10秒
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="-mx-[12px]">
                <div className="flex px-[12px] mb-[16px]">
                  <div className="">
                    <Image
                      src="/images/info_icon_16px.png"
                      alt="test"
                      width={20}
                      height={20}
                    />
                  </div>
                  <div className="pl-[8px]">
                    <a
                      href="https://fomonouns.wtf"
                      target="_blank"
                      rel="noreferrer"
                    >
                      次にミントされるNounの投票をしてください
                    </a>
                  </div>
                </div>
              </div>
              <div className="-mx-[12px]">
                <div className="flex px-[12px]">
                  <div className="">
                    <input
                      type="text"
                      id="first_name"
                      className="h-[54px] w-[320px] text-[#D9DBE2] bg-[#fff] !rounded-[12px] !outline-[none] [box-shadow:none!important] font-['PT_Root_UI'] font-bold text-[20px] [transition:all_.2s_ease-in-out] block px-3 py-1.5 leading-normal bg-clip-padding appearance-none border-none "
                      placeholder="Ξ 33.26 かそれ以上"
                      required
                    />
                  </div>
                  <div className="">
                    <BidButton className="h-[54px] text-[16px] font-normal ml-[9px] bg-[#9fa0a3]" />
                  </div>
                </div>
              </div>
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
          </div>
          <div className="!px-[0] !py-16 flex justify-center items-center">
            <div className="w-[1140px] px-[12px] mx-[70px]">
              <div className="!items-center -mx-[12px]">
                <div className="ml-[95px] px-[12px]">
                  <div className="flex-col text-[1.3rem] mr-[95px]">
                    <div className="font-['Londrina_Solid'] text-[4rem] text-[#14161b] mt-[4px] mx-[0] mb-[0]">
                      <h1>WTF?</h1>
                    </div>
                    <div className="font-['PT_Root_UI',sans-serif] font-medium tracking-[-.25px] leading-[28px] !m-0 pt-4 block text-[1.3rem]">
                      <p>
                        Nouns
                        は、オンチェーン・アバターコミュニティの形成を改善するための実験的な試みです。
                        <a
                          className="text-[#d63c5e] font-['PT_Root_UI'] font-bold underline cursor-pointer tracking-[-.25px] leading-[28px] text-[1.3rem]"
                          href="https://cryptopunks.app/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          クリプトパンクス
                        </a>{" "}
                        などのプロジェクトがデジタルコミュニティとアイデンティティの構築を試みているのに対し、Nounsはアイデンティティ、コミュニティ、ガバナンス、そしてコミュニティが使用できるトレジャリーを構築することを試みています。
                      </p>
                    </div>
                    <div className="pb-16 font-['PT_Root_UI',sans-serif] font-medium tracking-[-.25px] leading-[28px] !m-0 pt-4">
                      <p className="">
                        詳しくは以下をご覧ください。また、
                        <a
                          className="text-[#d63c5e] font-['PT_Root_UI'] font-bold underline cursor-pointer tracking-[-.25px] leading-[28px] text-[1.3rem]"
                          href="/playground"
                          target="_self"
                          rel="noreferrer"
                        >
                          遊び場
                        </a>{" "}
                        を使いNounsのオフチェーンの作成をすることもできます。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
