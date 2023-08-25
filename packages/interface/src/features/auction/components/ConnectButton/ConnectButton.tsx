import { useState } from 'react';
import { Button } from "@/components/elements/Button";
import { useAuctionController } from "@/hooks/useAuction";
import { BaseProps } from "@/types/BaseProps";
import { ConnectModal } from "@/features/auction/components/ConnectButton/ConnectModal";
import clsx from "clsx";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from 'wagmi'

export type ConnectButtonProps = {} & BaseProps;

/**
 * ConnectButton
 * @YosukeMiyata
 */
export const ConnectButton = ({ className }: ConnectButtonProps) => {
  const auctionController = useAuctionController();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleClick = async () => {
    alert("入札!");
    await auctionController.bid();
  };

  const { address, connector, isConnected } = useAccount()
  const { data: ensAvatar } = useEnsAvatar({ address })
  const { data: ensName } = useEnsName({ address })
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return (
      <div>
        <button
          className={clsx(className)}
          variant="tertiary"
          onClick={()=>{
            disconnect
            console.log("disconnect")
          }}
        >
          {/* <img src={ensAvatar} alt="ENS Avatar" /> */}
          <div>{ensName ? `${ensName} (${address})` : address}</div>
          {/* <div>Connected to {connector.name}</div> */}
          Disconnect
        </button>
      </div>
    )
  } else {
    return (
      <div>
      <ConnectModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        className={className}
      />
      {/* {connectors.map((connector) => (
        <button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          {connector.name}
          {!connector.ready && ' (unsupported)'}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            ' (connecting)'}
        </button>
      ))} */}

      {error && <div>{error.message}</div>}
      <Button
        className={clsx(className)}
        variant="tertiary"
        onClick={() => setModalOpen(true)}
        // onClick={()=>{handleClick()}}
      >
        接続する
      </Button>
    </div>
    )

  }
};
