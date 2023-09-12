import { Link } from "@/components/elements/Link";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";

export type DateSelectionProps = {} & BaseProps;
/**
 * DateSelection
 * @YosukeMiyata
 */
export const DateSelection = ({ className }: DateSelectionProps) => {
  return (
    <div className={clsx(className, "flex items-center")}>
      <div className={clsx("flex", "mr-2")}>
        <Link href="" theme="none">
          <FaCircleArrowLeft
            className={clsx("w-7 h-7", "mr-1")}
            color="#4A5567"
          />
        </Link>
        <Link href="" theme="none">
          <FaCircleArrowRight className={clsx("w-7 h-7")} color="#4A5567" />
        </Link>
      </div>
      <div className={clsx("text-[#79809c]")}>2023年8月11日</div>
    </div>
  );
};
