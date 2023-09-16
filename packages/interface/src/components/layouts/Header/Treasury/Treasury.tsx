import { useEffect, useState } from "react";
import { Link } from "@/components/elements/Link";
import { STAGE, TREASURY } from "@/config/config";
import { PRODUCTION } from "@/const/const";
import { BaseProps } from "@/types/BaseProps";
import { toFixedBigint } from "@/utils/util";
import clsx from "clsx";
import { useBalance } from "wagmi";

export type TreasuryProps = {} & BaseProps;

/**
 * Treasury
 * @YosukeMiyata
 */
export const Treasury = ({ className }: TreasuryProps) => {
  const { data } = useBalance({
    address: TREASURY,
  });
  const [balance, setBalance] = useState(0n);

  useEffect(() => {
    setBalance(data?.value ?? 0n);
  }, [data?.value]);

  return (
    <Link
      className={clsx(className)}
      href={
        STAGE === PRODUCTION
          ? `https://optimistic.etherscan.io//address/${TREASURY}`
          : `https://goerli-optimism.etherscan.io/address/${TREASURY}`
      }
      isExternal={true}
    >
      トレジャリー{" "}
      <span className={clsx("ml-2")}>Ξ {toFixedBigint(balance, 2)}</span>
    </Link>
  );
};
