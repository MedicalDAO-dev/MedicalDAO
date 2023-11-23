import Image from "next/image";
import { AuctionImage } from "@/features/auction/components/AuctionImage";
import { CloseModalButton } from "@/features/user/components/ConnectButton/ConnectModal/CloseModalButton";
import { useAuctionValue } from "@/hooks/useAuction";
import { useIsConnectModalOpenValue } from "@/hooks/useIsConnectModalOpen";
import { useUserValue } from "@/hooks/useUser";
import { AuctionModel } from "@/models/AuctionModel";
import transparentIcon from "@/public/assets/images/logo.webp";
import { BaseProps } from "@/types/BaseProps";
import { abbreviateAddress, toFixedBigint } from "@/utils/util";
import clsx from "clsx";
import { v4 as uuidv4 } from "uuid";
import { Address } from "wagmi";

export type MoreBidListsModalProps = {} & BaseProps;

/**
 * MoreBidListsModal
 * @YosukeMiyata
 */
export const MoreBidListsModal = ({ className }: MoreBidListsModalProps) => {
  const isModalOpen = useIsConnectModalOpenValue();
  const { address } = useUserValue();
  const auction = useAuctionValue();
  const { bids } = auction;

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
          "bg-[#F4F4F9]",
          "flex flex-col",
        )}
      >
        <div className={clsx("flex flex-row", "pb-[10px]")}>
          <AuctionImage
            className={clsx("w-[64px]", "h-[64px]", "rounded-[15px]")}
          />
          <div className={clsx("flex flex-col", "pl-[20px]")}>
            入札
            <div
              className={clsx(
                className,
                "font-['Londrina_Solid'] text-4xl text-[#151c3b]",
              )}
            >
              Token {_getTokenId(auction, address)}
            </div>
          </div>
          <div className={clsx("pl-20", "pt-6")}>
            <CloseModalButton
              className={clsx("bg-[#E1E0E6]", "px-4", "py-2", "rounded-[5px]")}
            />
          </div>
        </div>
        <div
          className={clsx(
            "bg-[#E1E0E6]",
            "px-2",
            "flex flex-col",
            "rounded-[10px]",
          )}
        >
          <div className={clsx("mb-1")}>
            {bids
              .slice()
              .reverse()
              .map((bid, i) => {
                const { bidder, amount } = bid;
                return (
                  <div key={uuidv4()}>
                    <div
                      className={clsx(
                        "flex justify-between",
                        "py-3",
                        "px-2",
                        "my-3",
                        "bg-white",
                        "rounded-[10px]",
                      )}
                    >
                      <div
                        className={clsx("pl-2", "flex flex-row items-center")}
                      >
                        <Image
                          className={clsx("w-[35px]", "h-[35px]", "mr-2")}
                          src={transparentIcon}
                          alt="transparentIcon"
                        />
                        {abbreviateAddress(bidder)}
                      </div>
                      <div className={clsx("flex items-center", "pr-2")}>
                        <div className={clsx("mr-4")}>
                          Ξ {toFixedBigint(amount, 2)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
const _getTokenId = (auction: AuctionModel, address: Address): number => {
  const { tokenId } = auction.nft;
  if (!auction.isEndAuction()) return Number(tokenId);
  if (auction.isSuccessfulBidder(address)) return Number(tokenId);
  return Number(tokenId + 1n);
};
