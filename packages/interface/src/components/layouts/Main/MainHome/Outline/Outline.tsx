import Image from "next/image";
import Link from "next/link";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type OutlineProps = {} & BaseProps;

/**
 * Outline
 * @keit0728
 */
export const Outline = ({ className }: OutlineProps) => {
  return (
    <div className={clsx(className)}>
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
  );
};