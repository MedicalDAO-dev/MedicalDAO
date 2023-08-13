import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type ButtonProps = {
  variant?: "primary" | "secondary";
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
        "text-[19px]",
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
  secondary: clsx("text-white"),
};
