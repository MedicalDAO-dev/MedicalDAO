import { Button } from "@/components/elements/Button";
import { MoreBidListsModal } from "@/features/auction/components/MoreBidListsButton/MoreBidListsModal";
import { useIsConnectModalOpenController } from "@/hooks/useIsConnectModalOpen";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type MoreBidListsButtonProps = {} & BaseProps;

/**
 * MoreBidListsButton
 * @YosukeMiyata
 */
export const MoreBidListsButton = ({ className }: MoreBidListsButtonProps) => {
  const { open } = useIsConnectModalOpenController();

  const handleClick = () => {
    open();
  };

  return (
    <>
      <MoreBidListsModal />
      <Button
        className={clsx(
          "flex justify-center",
          "font-['PT_Root_UI'] font-bold text-[#79809c] hover:text-[#4965f0]",
        )}
        theme="none"
        onClick={handleClick}
      >
        すべての入札を表示
      </Button>
    </>
  );
};
