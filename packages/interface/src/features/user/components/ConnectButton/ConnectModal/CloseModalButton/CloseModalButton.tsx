import { Button } from "@/components/elements/Button";
import { useIsConnectModalOpenController } from "@/hooks/useIsConnectModalOpen";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type CloseModalButtonProps = {} & BaseProps;

/**
 * CloseModalButton
 * @keit0728
 */
export const CloseModalButton = ({ className }: CloseModalButtonProps) => {
  const { close } = useIsConnectModalOpenController();

  const handleClick = () => {
    close();
  };

  return (
    <Button className={clsx(className)} theme="none" onClick={handleClick}>
      閉じる
    </Button>
  );
};
