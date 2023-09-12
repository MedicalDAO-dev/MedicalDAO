import { Divider } from "@/components/elements/Divider";
import { BaseProps } from "@/types/BaseProps";
import { abbreviateString } from "@/utils/util";
import clsx from "clsx";
import { FiExternalLink } from "react-icons/fi";
import { v4 as uuidv4 } from "uuid";

export type BidListProps = {} & BaseProps;

const dummyBids = [
  { bidder: "0x019281ce34F8b8739991713D5E09D0C290B53886", bidAmount: 32.2 },
  { bidder: "0x31F31693723c4397cb8A978A19A95B82c72f4212", bidAmount: 10.25 },
];

/**
 * BidList
 * @YosukeMiyata
 */
export const BidList = ({ className }: BidListProps) => {
  return (
    <div
      className={clsx(
        className,
        "flex flex-col justify-between",
        "w-[100%]",
        "font-['PT_Root_UI',sans-serif] font-bold",
      )}
    >
      <div className={clsx("mb-4")}>
        {dummyBids.map((bid) => {
          const { bidder, bidAmount } = bid;
          return (
            <div key={uuidv4()}>
              <div className={clsx("flex justify-between", "my-4")}>
                <div className={clsx("pl-2")}>{abbreviateString(bidder)}</div>
                <div className={clsx("flex items-center", "pr-2")}>
                  <div className={clsx("mr-4")}>Ξ {bidAmount}</div>
                  <FiExternalLink className={clsx("w-5 h-5")} color="gray" />
                </div>
              </div>
              <Divider />
            </div>
          );
        })}
      </div>
      <div
        className={clsx(
          "flex justify-center",
          "font-['PT_Root_UI'] font-bold text-[#79809c]",
        )}
      >
        すべての入札を表示
      </div>
    </div>
  );
};
