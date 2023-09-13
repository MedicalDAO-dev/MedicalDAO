import { Link } from "@/components/elements/Link";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type ForumProps = {} & BaseProps;

/**
 * Forum
 * @YosukeMiyata
 */
export const Forum = ({ className }: ForumProps) => {
  return (
    <Link className={clsx(className)} href="" theme="none">
      Forum
    </Link>
  );
};
