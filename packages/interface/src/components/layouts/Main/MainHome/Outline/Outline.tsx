import { Link } from "@/components/elements/Link";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type OutlineProps = {} & BaseProps;

/**
 * Outline
 * @YosukeMiyata
 */
export const Outline = ({ className }: OutlineProps) => {
  return (
    <div className={clsx(className, "max-w-[926px]")}>
      <div
        className={clsx(
          "font-['Londrina_Solid'] text-7xl text-[#14161b]",
          "mb-4 tracking-wider",
        )}
      >
        What's MedicalDAO about?
      </div>
      <div className={clsx("font-['PT_Root_UI',sans-serif] text-xl")}>
        <div className={clsx("mb-12")}>
          MedicalDAOは「分散型医療」の実現を目指すプラットフォームです。
          <br />
          DAO(Decentralized Autonomous Organization)
          の金字塔、Nounsのコンセプトを基に構築されています。新しい医療コミュニティを形成し、全ての決定はコミュニティが主導します。
          医療者と非医療者が共創するプロジェクトを通じて、
          <span className={clsx("font-bold", "text-red-500")}>
            個人の医療データ所有と公平な医療アクセスを提供することが私たちのビジョン
          </span>
          です。
        </div>
      </div>
      <div
        className={clsx(
          "font-['Londrina_Solid'] text-7xl text-[#14161b]",
          "mb-4 tracking-wider",
        )}
      >
        What's our auction about?
      </div>
      <div className={clsx("font-['PT_Root_UI',sans-serif] text-xl")}>
        <div className={clsx("mb-2")}>
          コミュニティ主導で全ての決定をしていくにあたって、投票権利を有するNFTをオークション形式で販売いたします。
          このオークションは、入札と同時に開始され、24時間で終了します。
          また、売り上げは維持管理費を除いた全ての金額を有望な医療プロジェクトへの投資に使用いたします。
          <br />
          詳しくは
          <Link
            href="https://cerulean-flannel-4b5.notion.site/6731ccad0750445a8562bcc019750cab?pvs=4"
            isExternal={true}
            theme="secondary"
          >
            こちら
          </Link>
          をご覧ください。
          <br />
          <br />
          <span className={clsx("font-bold", "text-red-500")}>
            当プロジェクトにご参加いただけることを、心からお待ちしております。
          </span>
        </div>
      </div>
    </div>
  );
};
