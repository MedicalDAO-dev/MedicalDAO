import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type MainProps = {} & BaseProps;

/**
 * Main
 * @keit0728
 */
export const Main = ({ className, children }: MainProps) => {
  return (
    <main className={clsx(className, "bg-background-main", "pb-16")}>
      {children}
    </main>
  );
};
