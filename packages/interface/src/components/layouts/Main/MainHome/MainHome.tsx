import { Button } from "@/components/elements/Button";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type MainHomeProps = {} & BaseProps;

/**
 * MainHome
 * @keit0728
 */
export const MainHome = ({ className }: MainHomeProps) => {
  return (
    <div className={clsx(className)}>
      main homeだよ!
      <Button>ログイン</Button>
    </div>
  );
};
