import { useAuctionValue } from "@/hooks/useAuction";
import { formatDurationHMS } from "@/lib/date/formatDateTIme";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type TimeLimitProps = {} & BaseProps;

/**
 * TimeLimit
 * @YosukeMiyata
 */
export const TimeLimit = ({ className }: TimeLimitProps) => {
  const { currentDateTime, endTime } = useAuctionValue();
  const duration = formatDurationHMS(endTime - BigInt(currentDateTime))

  return (
    <div className={clsx(className, "font-bold")}>
      <div className={clsx("mb-2", "text-lg text-[#79809c]")}>
        オークション終了まで
      </div>
      <div className={clsx("font-['PT_Root_UI'] text-3xl")}>{duration}</div>
    </div>
  );
};
