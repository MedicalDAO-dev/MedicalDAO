import { DocumentLink } from "@/components/layouts/Header/DocumentLink";
import { Logo } from "@/components/layouts/Header/Logo";
import { Treasury } from "@/components/layouts/Header/Treasury";
import { ConnectButton } from "@/features/user/components/ConnectButton";
import { UserInfo } from "@/features/user/components/UserInfo";
import { useUserValue } from "@/hooks/useUser";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type HeaderProps = {} & BaseProps;

/**
 * Header
 * @keit0728
 */
export const Header = ({ className }: HeaderProps) => {
  const user = useUserValue();

  return (
    <header
      className={clsx(
        className,
        "px-3 pt-2 pb-4",
        "bg-background-header",
        "flex justify-between items-center",
      )}
    >
      <div className={clsx("flex justify-center items-center")}>
        <Logo className={clsx("mr-4")} />
        <Treasury />
      </div>
      <div className={clsx("flex justify-center items-center")}>
        <DocumentLink className={clsx("mr-2")} />
        {user.isConnected() ? <UserInfo /> : <ConnectButton />}
      </div>
    </header>
  );
};
