import { Button } from "@/components/elements/Button";
import { ConnectModal } from "@/features/user/components/ConnectButton/ConnectModal";
import { useIsConnectModalOpenController } from "@/hooks/useIsConnectModalOpen";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type ConnectButtonProps = {} & BaseProps;

/**
 * ConnectButton
 * @YosukeMiyata
 */
export const ConnectButton = ({ className }: ConnectButtonProps) => {
  const { open } = useIsConnectModalOpenController();

  const handleClick = () => {
    open();
  };

  return (
    <>
      <ConnectModal />
      <Button
        className={clsx(className, "rounded-[10px]")}
        onClick={handleClick}
      >
        接続する
      </Button>
    </>
  );
};
