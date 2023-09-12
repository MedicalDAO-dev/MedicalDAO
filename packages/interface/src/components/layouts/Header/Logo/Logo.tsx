import Image from "next/image";
import { Link } from "@/components/elements/Link";
import transparentIcon from "@/public/assets/images/logo.webp";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type LogoProps = {} & BaseProps;

/**
 * Logo
 * @YosukeMiyata
 */
export const Logo = ({ className }: LogoProps) => {
  return (
    <Link className={clsx(className)} href="/" theme="none">
      <Image
        className={clsx("w-[70px] h-[70px]")}
        src={transparentIcon}
        alt="transparentIcon"
      />
    </Link>
  );
};
