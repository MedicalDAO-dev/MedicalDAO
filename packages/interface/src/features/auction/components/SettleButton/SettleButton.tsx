import { useState } from "react";
import { Button } from "@/components/elements/Button";
import { useAuctionController } from "@/hooks/useAuction";
import { useIsDisableState } from "@/hooks/useIsDisable";
import { useUserValue } from "@/hooks/useUser";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type SettleButtonProps = {} & BaseProps;

/**
 * SettleButton
 * @keit0728
 */
export const SettleButton = ({ className }: SettleButtonProps) => {
  const bidder = useUserValue();
  const { settleAndCreateNewAuction } = useAuctionController();
  const [disabled, { on: onDisabled, off: offDisabled }] = useIsDisableState();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!bidder.isConnected()) {
      alert("ウォレットを接続してください");
      return;
    }
    try {
      onDisabled();
      setLoading(true);
      await settleAndCreateNewAuction();
    } catch (e) {
      console.error(e);
      if (e instanceof Error) {
        alert("エラー\n理由: " + e.message);
      } else alert("エラー\n理由: " + e);
      offDisabled();
      setLoading(false);
      return;
    }
    offDisabled();
    setLoading(false);
  };

  return (
    <Button
      className={clsx(className)}
      disabled={disabled}
      loading={loading}
      theme="secondary"
      onClick={handleClick}
    >
      落札する
    </Button>
  );
};
