import { formatDurationHMS } from "@/lib/date/formatDateTime";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type TimeLimitProps = { duration: number } & BaseProps;

/**
 * TimeLimit
 * @YosukeMiyata
 */
export const TimeLimit = ({ duration, className }: TimeLimitProps) => {
  const durationHMS = formatDurationHMS(duration);

  return (
    <div className={clsx(className, "font-bold")}>
      <div className={clsx("mb-2", "text-lg text-[#79809c]")}>
        オークション終了まで
      </div>
      <div className={clsx("font-['PT_Root_UI'] text-3xl")}>{durationHMS}</div>
    </div>
  );
};
