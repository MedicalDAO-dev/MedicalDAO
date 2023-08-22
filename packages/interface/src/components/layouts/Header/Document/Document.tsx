import Image from "next/image";
import Link from "next/link";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type DocumentProps = {} & BaseProps;

/**
 * Document
 * @YosukeMiyata
 */
export const Document = ({ className }: DocumentProps) => {
  return (
    <div className={clsx(className, "mr-[4px]")}>
      <Link
        href="https://nouns.center/"
        target="_blank"
        rel="noreferrer"
        className={clsx(
          "p-[5px]",
          "font-['PT_Root_UI']",
          "font-bold",
          "text-[.9rem]",
          "p-[0.3rem]",
          "text-[#000]",
        )}
      >
        <div
          className={clsx(
            "border-[1px]",
            "border-solid",
            "border-[#bdc0cf]",
            "rounded-[10px]",
            "text-[#151c3b]",
            "h-[40px]",
            "text-[16px]",
            "leading-[16px]",
            "font-['PT_Root_UI']",
            "font-bold",
            "px-[12px]",
            "py-[0]",
            "[transition:all_.125s_ease-in-out]",
            "[box-shadow:none!important]",
          )}
        >
          <div
            className={clsx(
              "flex",
              "flex-row",
              "items-center",
              "justify-center",
              "h-full",
              "w-full",
            )}
          >
            <div className={clsx("mr-[0.4rem]")}>
              <Image
                src="/images/book_icon_32px.png"
                alt="test"
                width={20}
                height={20}
              />
            </div>
            <div className={clsx("text-[#151c3b]")}>ドキュメント</div>
          </div>
        </div>
      </Link>
    </div>
  );
};
