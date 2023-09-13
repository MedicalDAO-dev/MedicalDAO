export const abbreviateString = (
  str: string,
  startLength = 4,
  endLength = 4,
) => {
  if (str.length <= startLength + endLength) {
    return str; // 文字列が短い場合、そのまま返す
  }
  const startStr = str.substring(0, startLength);
  const endStr = str.substring(str.length - endLength);
  return `${startStr}...${endStr}`;
};
