import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type DividerProps = {
  orientation?: "horizontal" | "vertical";
} & BaseProps;

/**
 * Divider
 * @keit0728
 */
export const Divider = ({
  className,
  orientation = "horizontal",
}: DividerProps) => {
  return (
    <div
      className={clsx(
        className,
        "border-[#BABFCD]",
        orientation === "horizontal" ? "border-t-[1px]" : "border-r-[1px]",
      )}
    />
  );
};
