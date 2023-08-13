import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type ButtonProps = {
  variant?: "primary" | "secondary" | "tertiary";
  onClick?: () => void;
} & BaseProps; //文字列を制限できる

/**
 * Button
 * @keit0728
 */
export const Button = ({
  className,
  children,
  variant = "primary",
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        className,
        variants[variant],
        "font-bold",
        "px-[16px]",
        "py-[10px]",
        "rounded-[12px]",
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const variants = {
  primary: clsx("bg-white"),
  secondary: clsx("bg-black text-white text-[19px]"),
  tertiary: clsx("bg-[#9fa0a3] text-white"),
};
