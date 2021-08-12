export const formatSeconds = (seconds: number): string => {
  const mmNum = Math.floor(seconds / 60);
  const ssNum = seconds % 60;
  const mm = String(mmNum).padStart(2, "0");
  const ss = String(ssNum).padStart(2, "0");
  return `${mm}：${ss}`;
};

export const formatStringByLength = (length: number, name: string): string => {
  if (name.length >= length) {
    return name.slice(0, length) + "...";
  } else {
    return name;
  }
};

export const convertDatetimeToTime = (datetime: string | undefined): string => {
  if (datetime === undefined) {
    return "";
  }
  const hour = datetime.slice(11, 13);
  const minutes = datetime.slice(14, 16);
  return hour + "：" + minutes;
};

export const formatDate = (date: Date): string => {
  const yyyy = String(date.getFullYear()).padStart(4, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

export const displayLocalDate = (date: Date): string => {
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  const dateStr = date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  return dateStr;
};
