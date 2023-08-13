import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type ButtonProps = {
  variant?: "primary" | "secondary" | "tertiary" | "quaternary";
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
    <button className={clsx(className, variants[variant])} onClick={onClick}>
      {children}
    </button>
  );
};

const variants = {
  primary: clsx(
    "bg-white text-[19px] font-bold px-[16px] py-[10px] rounded-[12px]",
  ),
  secondary: clsx(
    "bg-black text-white text-[19px] font-bold px-[16px] py-[10px] rounded-[12px]",
  ),
  tertiary: clsx("bg-[#e9ebf3] text-black font-bold"),
  quaternary: clsx(
    "bg-[#9fa0a3] text-white font-bold px-[16px] py-[10px] rounded-[12px]",
  ),
};
