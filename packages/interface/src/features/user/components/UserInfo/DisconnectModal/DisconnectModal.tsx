import { DisconnectButton } from "@/features/user/components/UserInfo/DisconnectModal/DisconnectButton";
import { useIsDisconnectModalOpenValue } from "@/hooks/useIsDisconnectModalOpen";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type DisconnectModalProps = {} & BaseProps;

/**
 * DisconnectModal
 * @keit0728
 */
export const DisconnectModal = ({ className }: DisconnectModalProps) => {
  const isModalOpen = useIsDisconnectModalOpenValue();

  if (!isModalOpen) return <></>;
  return (
    <div
      className={clsx(
        className,
        "absolute bottom-[-65px] left-0 right-0",
        "bg-[#e9ebf3]",
        "rounded-md py-4",
        "flex justify-center items-center",
      )}
    >
      <DisconnectButton />
    </div>
  );
};
