import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type ButtonProps = {
  color?: "primary" | "secondary";
  onClick?: () => void;
} & BaseProps; //文字列を制限できる

/**
 * Button
 * @keit0728
 */
export const Button = ({
  className,
  children,
  color = "primary",
  onClick,
}: ButtonProps) => {
  return (
    <button className={clsx(className, colors[color])} onClick={onClick}>
      {children}
    </button>
  );
};

const colors = {
  primary: clsx("bg-[#e9ebf3]", "text-black", "font-bold"),
  secondary: clsx(
    "bg-[#9fa0a3]",
    "text-white",
    "font-bold",
    "px-[16px]",
    "py-[10px]",
    "rounded-[12px]",
  ),
};
