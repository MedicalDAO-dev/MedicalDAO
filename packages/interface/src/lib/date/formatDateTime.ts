export const formatDurationHMS = (duration: number): string => {
  const MINUTE = 60;
  const HOUR = MINUTE * 60;

  let hours;
  let minutes;
  let seconds;
  if (duration >= 0) {
    hours = duration / HOUR;
    duration = duration % HOUR;
    minutes = duration / MINUTE;
    seconds = duration % MINUTE;
    hours = hours <= 99 ? hours : 99;
  } else {
    hours = 0;
    minutes = 0;
    seconds = 0;
    return "入札終了";
  }

  return `${hours}時間 ${minutes}分 ${seconds}秒`;
};
