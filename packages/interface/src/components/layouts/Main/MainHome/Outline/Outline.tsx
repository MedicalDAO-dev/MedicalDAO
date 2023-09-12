import Link from "next/link";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type OutlineProps = {} & BaseProps;

/**
 * Outline
 * @YosukeMiyata
 */
export const Outline = ({ className }: OutlineProps) => {
  return (
    <div
      className={clsx(
        "px-[0]",
        "py-16",
        "flex",
        "justify-center",
        "items-center",
      )}
    >
      <div
        className={clsx(
          "w-[1140px]",
          "px-[12px]",
          "mx-[70px]",
          "items-center",
          "-mx-[12px]",
          "ml-[95px]",
        )}
      >
        <div className={clsx(className, "flex-col", "text-[1.3rem]", "mr-[95px]")}>
          <div
            className={clsx(
              "font-['Londrina_Solid']",
              "text-[4rem]",
              "text-[#14161b]",
              "mt-[4px]",
              "mx-[0]",
              "mb-[0]",
            )}
          >
            <h1>WTF?</h1>
          </div>
          <div
            className={clsx(
              "font-['PT_Root_UI',sans-serif]",
              "font-medium",
              "tracking-[-.25px]",
              "leading-[28px]",
              "m-0",
              "pt-4",
              "block",
              "text-[1.3rem]",
            )}
          >
            <p>
              Nouns
              は、オンチェーン・アバターコミュニティの形成を改善するための実験的な試みです。
              <Link
                className={clsx(
                  "text-[#d63c5e]",
                  "font-['PT_Root_UI']",
                  "font-bold",
                  "underline",
                  "cursor-pointer",
                  "tracking-[-.25px]",
                  "leading-[28px]",
                  "text-[1.3rem]",
                )}
                href="https://cryptopunks.app/"
                target="_blank"
                rel="noreferrer"
              >
                クリプトパンクス
              </Link>{" "}
              などのプロジェクトがデジタルコミュニティとアイデンティティの構築を試みているのに対し、Nounsはアイデンティティ、コミュニティ、ガバナンス、そしてコミュニティが使用できるトレジャリーを構築することを試みています。
            </p>
          </div>
          <div
            className={clsx(
              "pb-16",
              "font-['PT_Root_UI',sans-serif]",
              "font-medium",
              "tracking-[-.25px]",
              "leading-[28px]",
              "m-0",
              "pt-4",
            )}
          >
            <p className={clsx(className)}>
              詳しくは以下をご覧ください。また、
              <Link
                className={clsx(
                  "text-[#d63c5e]",
                  "font-['PT_Root_UI']",
                  "font-bold",
                  "underline",
                  "cursor-pointer",
                  "tracking-[-.25px]",
                  "leading-[28px]",
                  "text-[1.3rem]",
                )}
                href="/playground"
                target="_self"
                rel="noreferrer"
              >
                遊び場
              </Link>{" "}
              を使いNounsのオフチェーンの作成をすることもできます。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
