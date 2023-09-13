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
          "mb-4",
        )}
      >
        WTF?
      </div>
      <div className={clsx("font-['PT_Root_UI',sans-serif] text-xl")}>
        <div className={clsx("mb-2")}>
          Nounsは、オンチェーン・アバターコミュニティの形成を改善するための実験的な試みです。
          <Link
            href="https://cryptopunks.app/"
            isExternal={true}
            theme="secondary"
          >
            クリプトパンクス
          </Link>
          などのプロジェクトがデジタルコミュニティとアイデンティティの構築を試みているのに対し、Nounsはアイデンティティ、コミュニティ、ガバナンス、そしてコミュニティが使用できるトレジャリーを構築することを試みています。
        </div>
        <div>
          詳しくは以下をご覧ください。また、
          <Link href="/playground" theme="secondary">
            遊び場
          </Link>
          を使いNounsのオフチェーンの作成をすることもできます。
        </div>
      </div>
    </div>
  );
};