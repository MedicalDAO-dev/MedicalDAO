import { Button } from "@/components/elements/Button";
import { useIsConnectModalOpenController } from "@/hooks/useIsConnectModalOpen";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";
import { Connector, useConnect, useSwitchNetwork } from "wagmi";

export type ConnectersButtonProps = {} & BaseProps;

/**
 * ConnectersButton
 * @keit0728
 */
export const ConnectersButton = ({ className }: ConnectersButtonProps) => {
  const { close } = useIsConnectModalOpenController();
  const { connect, connectors } = useConnect();
  // const { chain, chains } = useNetwork();
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();
  // console.log(chain);
  console.log(chains);

  const handleClick = (connector: Connector<any, any>) => {
    // console.log(chain);
    console.log(chains);
    connect({ connector });
    close();
  };

  return (
    <div className={clsx(className, "flex flex-col")}>
      {connectors.map((connector) => (
        <Button
          className={clsx("my-4")}
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => {
            handleClick(connector);
          }}
        >
          {connector.name}
        </Button>
      ))}
    </div>
  );
};
