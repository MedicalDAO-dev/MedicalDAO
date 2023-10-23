import React from "react";
import { Button } from "@/components/elements/Button";
import { useIsConnectModalOpenController } from "@/hooks/useIsConnectModalOpen";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";
// import { verifyMessage } from "ethers/lib/utils";
import { Connector, useConnect, useSwitchNetwork } from "wagmi";
import { useSignMessage } from "wagmi";

export type ConnectersButtonProps = {} & BaseProps;

/**
 * ConnectersButton
 * @keit0728
 */
export const ConnectersButton = ({ className }: ConnectersButtonProps) => {
  const { close } = useIsConnectModalOpenController();
  const { connectors, connectAsync } = useConnect();
  // const { chain, chains } = useNetwork();
  const { chains, pendingChainId, switchNetwork } = useSwitchNetwork();
  // console.log(chain);
  console.log(chains);

  const recoveredAddress = React.useRef<string>();
  const { data, error, isLoading, signMessage } = useSignMessage({
    onSuccess(data, variables) {
      // const address = verifyMessage(variables.message, data);
      // recoveredAddress.current = address;
      console.log("退避中");
    },
  });

  const handleClick = async (connector: Connector<any, any>) => {
    // console.log(chain);
    console.log(chains);
    try {
      await connectAsync({ connector });
      const message = "hello world"; //　ここに利用規約を入れる
      signMessage({ message });
    } catch (error) {
      console.error(error);
    }
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
