import Image from "next/image";
import Link from "next/link";
import { ConnectButton } from "@/features/auction/components/ConnectButton";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type ConnectionProps = {} & BaseProps;

/**
 * Connection
 * @keit0728
 */
export const Connection = ({ className }: ConnectionProps) => {
  return (
    <div className={clsx(className)}>
      <ConnectButton className="h-[40px] ml-[9px] text-[16px] border-[1px] border-solid border-[#bdc0cf] rounded-[10px] text-[#221b1a] px-[12px] py-[0] [transition:all_.2s_ease-in-out] font-bold h-[40px] text-[16px] leading-[16px] font-['PT_Root_UI'] font-bold [box-shadow:none!important]" />
    </div>
  );
};
