import { Button } from "@/components/elements/Button";
import { BaseProps } from "@/types/BaseProps";
import clsx from "clsx";

export type BidButtonProps = {} & BaseProps;

/**
 * BidButton
 * @keit0728
 */
export const BidButton = ({ className }: BidButtonProps) => {
  const handleClick = () => {
    alert("入札!");
  };
  return (
    <Button
      className={clsx(className)}
      variant="secondary"
      onClick={handleClick}
    >
      入札をする
    </Button>
  );
};
