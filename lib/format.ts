export const convertSecondsForDisplay = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const restSeconds = seconds % 60;
  return (
    String(minutes).padStart(2, "0") +
    "：" +
    String(restSeconds).padStart(2, "0")
  );
};

export const formatStringByLength = (length: number, name: string): string => {
  if (name.length >= length) {
    return name.slice(0, length) + "...";
  } else {
    return name;
  }
};

export const convertDatetimeToTime = (datetime: string): string => {
  const hour = datetime.slice(11, 13);
  const minutes = datetime.slice(14, 16);
  return hour + "：" + minutes;
};

export const convertDatetimeToPomodoroTerm = (createdAt: string): string => {
  const start = new Date(createdAt);
  start.setMinutes(start.getMinutes() - 25);
  return (
    String(start.getUTCHours()) +
    "：" +
    String(start.getUTCMinutes()).padStart(2, "0") +
    " - " +
    createdAt.slice(11, 13).padStart(2, "0") +
    "：" +
    createdAt.slice(14, 16)
  );
};
