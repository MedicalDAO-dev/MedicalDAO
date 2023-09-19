import { Link } from "@/components/elements/Link";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type EtherscanProps = {} & BaseProps;

/**
 * Etherscan
 * @YosukeMiyata
 */
export const Etherscan = ({ className }: EtherscanProps) => {
  return (
    <Link className={clsx(className)} href="" theme="footerHoverRed">
      Etherscan
    </Link>
  );
};
