import { Link } from "@/components/elements/Link";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";
import { IoBook } from "react-icons/io5";

export type DocumentLinkProps = {} & BaseProps;

/**
 * DocumentLink
 * @YosukeMiyata
 */
export const DocumentLink = ({ className }: DocumentLinkProps) => {
  return (
    <Link
      className={clsx(className, "flex justify-center items-center")}
      href="https://cerulean-flannel-4b5.notion.site/6731ccad0750445a8562bcc019750cab?pvs=4"
      isExternal={true}
    >
      <IoBook className={clsx("mr-2")} color="gray" />
      ドキュメント
    </Link>
  );
};
