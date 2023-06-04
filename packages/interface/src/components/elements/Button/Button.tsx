import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type ButtonProps = {} & BaseProps;

/**
 * Button
 * @keit0728
 */
export const Button = ({ className, children }: ButtonProps) => {
  return <button className={clsx(className)}>{children}</button>;
};
