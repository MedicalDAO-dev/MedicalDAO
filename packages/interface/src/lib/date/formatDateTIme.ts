export const formatDurationHMS = (duration: bigint): string => {
  const MINUTE = BigInt(60);
  const HOUR = MINUTE * BigInt(60);

  let hours;
  let minutes;
  let seconds;
  if (duration >= BigInt(0)) {
    hours = duration / HOUR;
    duration = duration % HOUR;
    minutes = duration / MINUTE;
    seconds = duration % MINUTE;
    hours = hours <= 99 ? hours : 99;
  } else {
    hours = BigInt(0);
    minutes = BigInt(0);
    seconds = BigInt(0);
    return "入札終了";
  }

  return `${hours}時間 ${minutes}分 ${seconds}秒`;
};

export const formatDateTimeYMD = (duration: number): string => {
  const date = new Date(duration * 1000);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}年 ${month}月 ${day}日`;
};
