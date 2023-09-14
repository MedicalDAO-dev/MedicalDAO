import { formatEther } from "viem";

/**
 * ウォレットアドレスを `0x00...0000` のように省略する
 * @param address アドレス
 * @param startLength 先頭の文字数
 * @param endLength 末尾の文字数
 * @returns {string} 省略後のアドレス
 */
export const abbreviateAddress = (
  address: string,
  startLength = 4,
  endLength = 4,
): string => {
  if (address.length <= startLength + endLength) return address;
  const startStr = address.substring(0, startLength);
  const endStr = address.substring(address.length - endLength);
  return `${startStr}...${endStr}`;
};

/**
 * bigint を小数点以下の桁数を指定して文字列に変換する
 * @param num bigint
 * @param fractionDigits 小数点以下の桁数
 * @returns {string} 変換後の文字列
 */
export const toFixedBigint = (num: bigint, fractionDigits: number): string => {
  const numberValue = parseFloat(formatEther(num));
  if (isNaN(numberValue)) {
    throw new Error("Invalid number string");
  }
  return (
    Math.floor(numberValue * 10 ** fractionDigits) /
    10 ** fractionDigits
  ).toFixed(fractionDigits);
};
