import Image from "next/image";
import Link from "next/link";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type DateSelectionProps = {} & BaseProps;

/**
 * DateSelection
 * @YosukeMiyata
 */
export const DateSelection = ({ className }: DateSelectionProps) => {
  return (
    <div className={clsx(className, "flex")}>
      <div className={clsx("flex", "justify-center", "items-center")}>
        <div className={clsx("flex")}>
          <Link href="">
            <Image
              src="/images/arrow_circle_left_72px.png"
              alt="一つ前のNFTを確認するアイコン"
              width={36}
              height={36}
            />
          </Link>
          <Link href="">
            <Image
              src="/images/arrow_circle_right_72px.png"
              alt="次のNFTを確認するアイコン"
              width={36}
              height={36}
              className={clsx("mr-[5px]")}
            />
          </Link>
        </div>
        <h4 className={clsx("text-[#79809c]")}>2023年8月11日</h4>
      </div>
    </div>
  );
};
