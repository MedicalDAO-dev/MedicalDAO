import Image from "next/image";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type BidListProps = {} & BaseProps;

/**
 * BidList
 * @YosukeMiyata
 */
export const BidList = ({ className }: BidListProps) => {
  return (
    <div className={clsx(className)}>
      <div className={clsx("-mx-[12px]")}>
        <div className={clsx("flex-col", "mx-[12px]")}>
          <ul className={clsx("my-[16px]")}>
            <li
              className={clsx(
                "flex",
                "items-center",
                "justify-between",
                "p-[13px]",
                "font-['PT_Root_UI',sans-serif]",
                "font-bold",
                "[border-bottom:1px_solid_#C6C8D8]",
              )}
            >
              <div className={clsx("flex")}>
                <div className={clsx("ml-[10px]")}>0xAa...2977</div>
              </div>
              <div className={clsx("flex")}>
                <div className={clsx("mr-4", "pt-[2px]")}>Ξ 32.60</div>
                <Image
                  src="/images/link_icon_64px.png"
                  alt="Etherscanなどへのリンクを表すアイコン"
                  width={24}
                  height={24}
                />
              </div>
            </li>
          </ul>
          <div className={clsx("flex", "justify-center")}>
            <div
              className={clsx(
                "pb-4",
                "ml-2",
                "font-['PT_Root_UI']",
                "font-bold",
                "text-[16px]",
                "text-[#79809c]",
              )}
            >
              すべての入札を表示
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
