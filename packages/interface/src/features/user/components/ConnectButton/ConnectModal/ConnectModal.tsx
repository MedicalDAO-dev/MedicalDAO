import { CloseModalButton } from "@/features/user/components/ConnectButton/ConnectModal/CloseModalButton";
import { ConnectersButton } from "@/features/user/components/ConnectButton/ConnectModal/ConnectersButton";
import { useIsConnectModalOpenValue } from "@/hooks/useIsConnectModalOpen";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type ConnectModalProps = {} & BaseProps;

/**
 * ConnectModal
 * @keit0728
 */
export const ConnectModal = ({ className }: ConnectModalProps) => {
  const isModalOpen = useIsConnectModalOpenValue();

  if (!isModalOpen) return <></>;
  return (
    <div
      className={clsx(
        className,
        "fixed top-0 left-0",
        "w-screen h-screen",
        "bg-black bg-opacity-[0.7]",
        "flex justify-center items-center",
      )}
    >
      <div
        className={clsx(
          "w-[400px] p-[20px] rounded-[8px]",
          "bg-white",
          "flex flex-col",
        )}
      >
        <ConnectersButton className={clsx("mb-8")} />
        <div className={clsx("flex justify-end")}>
          <CloseModalButton />
        </div>
      </div>
    </div>
  );
};
