import { useEffect } from "react";
import { Button } from "@/components/elements/Button";
import { DisconnectModal } from "@/features/user/components/UserInfo/DisconnectModal";
import { useIsDisconnectModalOpenState } from "@/hooks/useIsDisconnectModalOpen";
import { useUserValue } from "@/hooks/useUser";
import { BaseProps } from "@/types/BaseProps";
import { abbreviateString } from "@/utils/util";
import clsx from "clsx";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { useNetwork, useSwitchNetwork } from "wagmi";

export type UserInfoProps = {} & BaseProps;

/**
 * UserInfo
 * @YosukeMiyata
 */
export const UserInfo = ({ className }: UserInfoProps) => {
  const { address } = useUserValue();
  const [isModalOpen, { open, close }] = useIsDisconnectModalOpenState();
  const { chain, chains } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  const handleClick = () => {
    isModalOpen ? close() : open();
  };

  useEffect(() => {
    if (!chain || chains.length === 0 || !switchNetwork) return;
    if (chain.id !== chains[0].id) {
      switchNetwork(chains[0].id);
    }
  }, []);

  return (
    <div className={clsx("relative")}>
      <Button
        className={clsx(className, "flex items-center")}
        onClick={handleClick}
      >
        <div className={clsx("mr-2")}>{abbreviateString(address!)}</div>
        {isModalOpen ? <BiSolidUpArrow /> : <BiSolidDownArrow />}
      </Button>
      <DisconnectModal />
    </div>
  );
};
