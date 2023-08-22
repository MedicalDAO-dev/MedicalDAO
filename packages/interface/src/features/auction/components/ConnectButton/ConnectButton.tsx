import { Button } from "@/components/elements/Button";
import { useAuctionController } from "@/hooks/useAuction";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type ConnectButtonProps = {} & BaseProps;

/**
 * ConnectButton
 * @YosukeMiyata
 */
export const ConnectButton = ({ className }: ConnectButtonProps) => {
  const auctionController = useAuctionController();

  const handleClick = async () => {
    alert("入札!");
    await auctionController.bid();
  };

  return (
    <Button className={clsx(className)} color="primary" onClick={handleClick}>
      接続する
    </Button>
  );
};
