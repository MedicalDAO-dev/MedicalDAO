import { Link } from "@/components/elements/Link";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";
import { IoBook } from "react-icons/io5";

export type DocumentProps = {} & BaseProps;

/**
 * Document
 * @YosukeMiyata
 */
export const Document = ({ className }: DocumentProps) => {
  return (
    <Link
      className={clsx(className, "flex justify-center items-center")}
      href="https://nouns.center/"
      isExternal={true}
    >
      <IoBook className={clsx("mr-2")} color="gray" />
      ドキュメント
    </Link>
  );
};
