export const formatTimerTime = (seconds: number): string => {
  const mmNum = Math.floor(seconds / 60);
  const ssNum = seconds % 60;
  const mm = String(mmNum).padStart(2, "0");
  const ss = String(ssNum).padStart(2, "0");
  return `${mm}：${ss}`;
};

export const formatDate = (date: Date): string => {
  const yyyy = String(date.getFullYear()).padStart(4, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

export const formatToLocalTime = (date: Date): string => {
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  return `${hh}：${mm}`;
};

export const formatToLocalDatetime = (date: Date): string => {
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  const dateStr = date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  return dateStr;
};

export const formatDateToJP = (date: Date): string => {
  return date.toLocaleDateString("ja-JP", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
};

export const formatToLocalPomodoroDuring = (date: Date): string => {
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  const completedHour = String(date.getHours()).padStart(2, "0");
  const completedMinutes = String(date.getMinutes()).padStart(2, "0");

  date.setMinutes(date.getMinutes() - 25);
  const startHour = String(date.getHours()).padStart(2, "0");
  const startMinutes = String(date.getMinutes()).padStart(2, "0");
  date.setMinutes(date.getMinutes() + 25);

  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  return `${startHour}：${startMinutes} - ${completedHour}：${completedMinutes}`;
};
