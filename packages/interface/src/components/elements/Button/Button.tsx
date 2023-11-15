import { Spinner } from "@/components/elements/Spinner";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type ButtonProps = {
  theme?: "primary" | "secondary" | "none";
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
} & BaseProps;

/**
 * Button
 * @keit0728
 */
export const Button = ({
  className,
  children,
  disabled = false,
  loading = false,
  theme = "primary",
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={clsx(className, themes[theme])}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <Spinner className={clsx("w-[20px]", "h-[20px]", "border-[2px]")} />
      ) : (
        children
      )}
    </button>
  );
};

const themes = {
  primary: clsx(
    "bg-[#e9ebf3]",
    "text-black font-bold",
    "px-4 py-[10px] rounded-[12px]",
    "border-[1px] border-solid border-[#bdc0cf]",
    "hover:bg-white",
    "disabled:cursor-default disabled:opacity-50",
  ),
  secondary: clsx(
    "bg-black",
    "text-white font-bold",
    "px-4 py-[10px] rounded-[12px]",
    "hover:bg-[#9fa0a3]",
    "disabled:cursor-default disabled:opacity-50",
  ),
  none: clsx(""),
};
