import { useIsDisableValue } from "@/hooks/useIsDisable";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type ButtonProps = {
  theme?: "primary" | "secondary" | "none";
  disabled?: boolean;
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
  theme = "primary",
  onClick,
}: ButtonProps) => {
  const isDisable = useIsDisableValue();

  return (
    <button
      className={clsx(className, themes[theme])}
      onClick={onClick}
      disabled={disabled || isDisable}
    >
      {children}
    </button>
  );
};

const themes = {
  primary: clsx(
    "bg-[#e9ebf3] hover:bg-white",
    "text-black font-bold",
    "px-4 py-[10px] rounded-[12px]",
    "border-[1px] border-solid border-[#bdc0cf]",
  ),
  secondary: clsx(
    "bg-black hover:bg-[#9fa0a3]",
    "text-white font-bold",
    "px-4 py-[10px] rounded-[12px]",
  ),
  none: clsx(""),
};
