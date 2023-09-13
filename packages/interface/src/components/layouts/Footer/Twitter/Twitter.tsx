import { Link } from "@/components/elements/Link";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type TwitterProps = {} & BaseProps;

/**
 * Twitter
 * @YosukeMiyata
 */
export const Twitter = ({ className }: TwitterProps) => {
  return (
    <Link className={clsx(className)} href="" theme="none">
      Twitter
    </Link>
  );
};
