import { Link } from "@/components/elements/Link";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type TreasuryProps = {} & BaseProps;

/**
 * Treasury
 * @YosukeMiyata
 */
export const Treasury = ({ className }: TreasuryProps) => {
  return (
    <Link
      className={clsx(className)}
      href="https://etherscan.io/tokenholdings?a=0x0BC3807Ec262cB779b38D65b38158acC3bfedE10"
      isExternal={true}
    >
      トレジャリー <span className={clsx("ml-2")}>Ξ 28,903</span>
    </Link>
  );
};
