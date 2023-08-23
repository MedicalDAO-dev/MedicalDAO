import Image from "next/image";
import Link from "next/link";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type LogoProps = {} & BaseProps;

/**
 * Logo
 * @YosukeMiyata
 */
export const Logo = ({ className }: LogoProps) => {
  return (
    <div className={clsx(className, "py-[8px]", "mr-[16px]")}>
      <Link href="/">
        <Image
          src="/images/transparent_icon.png"
          alt="test"
          width={90}
          height={90}
        />
      </Link>
    </div>
  );
};
