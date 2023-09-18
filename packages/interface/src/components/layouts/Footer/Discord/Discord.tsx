import { Link } from "@/components/elements/Link";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type DiscordProps = {} & BaseProps;

/**
 * Discord
 * @YosukeMiyata
 */
export const Discord = ({ className }: DiscordProps) => {
  return (
    <Link
      className={clsx(className)}
      href="https://discord.com/invite/yf2DFHp9DK"
      theme="footerHoverRed"
    >
      Discord
    </Link>
  );
};
