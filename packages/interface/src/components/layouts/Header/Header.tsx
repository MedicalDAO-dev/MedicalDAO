import Image from "next/image";
import { ConnectButton } from "@/features/auction/components/ConnectButton";
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
      <div className="pt-[8px] pb-[16px] bg-[#D5D7E1] px-[12px] flex justify-center items-center">
        <div className="w-[1280px] flex justify-between">
          <div className="flex justify-center items-center">
            <div className="py-[8px] mr-[16px]">
              <Image src="/images/icon.jpg" alt="test" width={90} height={90} />
            </div>
            <div className="">
              <div className="px-[10px]">
                <a
                  href="https://etherscan.io/tokenholdings?a=0x0BC3807Ec262cB779b38D65b38158acC3bfedE10"
                  target="_blank"
                  rel="noreferrer"
                  className="font-['PT_Root_UI'] font-bold text-[.9rem] !p-[0.3rem] !text-[#000] block no-underline [transition:color_.15s_ease-in-out,background-color_.15s_ease-i"
                >
                  <div className="border-[1px] border-solid border-[#bdc0cf] rounded-[10px] text-[#151c3b] h-[40px] text-[16px] font-['PT_Root_UI'] font-bold px-[10px] py-[0] [transition:all_.125s_ease-in-out] [box-shadow:none]">
                    <div className="flex items-center justify-center h-full w-full">
                      <div className="flex">
                        <div className="text-[16px] mr-[0.4rem] mt-px">
                          トレジャリー
                        </div>
                        <div className="text-[16.5px] tracking-[.3px] ml-[0.4rem] mr-1">
                          Ξ 28,903
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="mr-[16px]">
              <a
                href="https://nouns.center/"
                target="_blank"
                rel="noreferrer"
                className="p-[5px] font-['PT_Root_UI'] font-bold text-[.9rem] !p-[0.3rem] !text-[#000]"
              >
                <div className="border-[1px] border-solid border-[#bdc0cf] rounded-[10px] text-[#151c3b] h-[40px] text-[16px] leading-[16px] font-['PT_Root_UI'] font-bold px-[12px] py-[0] [transition:all_.125s_ease-in-out] [box-shadow:none!important]">
                  <div className="flex flex-row items-center justify-center h-full w-full">
                    <div className="mr-[0.4rem]">
                      <Image
                        src="/images/book_icon_32px.png"
                        alt="test"
                        width={20}
                        height={20}
                      />
                    </div>
                    <div className="text-[#151c3b]">ドキュメント</div>
                  </div>
                </div>
              </a>
            </div>
            <div className="">
              <ConnectButton className="h-[40px] ml-[9px] text-[16px] border-[1px] border-solid border-[#bdc0cf] rounded-[10px] text-[#221b1a] px-[12px] py-[0] [transition:all_.2s_ease-in-out] font-bold h-[40px] text-[16px] leading-[16px] font-['PT_Root_UI'] font-bold [box-shadow:none!important]" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
