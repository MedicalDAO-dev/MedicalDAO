// components/ConnectModal.js
import clsx from "clsx";
import { useConnect } from "wagmi";

export const ConnectModal = ({
  isOpen,
  onClose,
  className,
}: {
  isOpen: any;
  onClose: any;
  className: any;
}) => {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  if (!isOpen) return null;
  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.7)", // 黒の背景を半透明に
      display: "flex",
      justifyContent: "center", // 子要素を水平方向に中央に配置
      alignItems: "center", // 子要素を垂直方向に中央に配置
    },
    modal: {
      width: "400px",
      padding: "20px",
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    },
  };

  return (
    <div>
      <div>
        <div style={styles.modal}>
          {connectors.map((connector, i) => (
            <div key={i}>
              <button
                className={clsx(className)}
                disabled={!connector.ready}
                key={connector.id}
                onClick={() => {
                  connect({ connector });
                  onClose();
                }}
              >
                {connector.name}
                {!connector.ready && " (unsupported)"}
                {isLoading &&
                  connector.id === pendingConnector?.id &&
                  " (connecting)"}
              </button>
              <br />
            </div>
          ))}
          {error && <div>{error.message}</div>}
          <button onClick={onClose}>閉じる</button>
        </div>
      </div>
    </div>
  );
};
