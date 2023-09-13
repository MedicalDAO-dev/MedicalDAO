import { Button } from "@/components/elements/Button";
import { useIsDisconnectModalOpenController } from "@/hooks/useIsDisconnectModalOpen";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";
import { useDisconnect } from "wagmi";

export type DisconnectButtonProps = {} & BaseProps;

/**
 * DisconnectButton
 * @keit0728
 */
export const DisconnectButton = ({ className }: DisconnectButtonProps) => {
  const { close } = useIsDisconnectModalOpenController();
  const { disconnect } = useDisconnect();

  const handleClick = () => {
    close();
    disconnect();
  };

  return (
    <Button
      className={clsx(className, "font-bold")}
      theme="none"
      onClick={handleClick}
    >
      接続解除
    </Button>
  );
};
