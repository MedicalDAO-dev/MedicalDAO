import NextLink from "next/link";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type LinkProps = {
  href: string;
  isExternal?: boolean;
  theme?: "primary" | "secondary" | "none";
} & BaseProps; //文字列を制限できる

/**
 * Link
 * @keit0728
 */
export const Link = ({
  className,
  children,
  href,
  theme = "primary",
  isExternal = false,
}: LinkProps) => {
  return (
    <NextLink
      className={clsx(className, themes[theme])}
      href={href}
      target={isExternal ? "_blank" : ""}
    >
      {children}
    </NextLink>
  );
};

const themes = {
  primary: clsx(
    "text-black font-bold",
    "px-4 py-[10px] rounded-[12px]",
    "border-[1px] border-solid border-[#bdc0cf]",
  ),
  secondary: clsx(
    "text-[#d63c5e] font-['PT_Root_UI'] font-bold",
    "underline",
    "px-1",
  ),
  none: clsx(""),
};
