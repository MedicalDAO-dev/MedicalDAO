import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type HeaderProps = {} & BaseProps;

/**
 * Header
 * @keit0728
 */
export const Header = ({ className }: HeaderProps) => {
  return <header className={clsx(className)}>headerだよ!</header>;
};
