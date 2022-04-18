export const formatTimerTime = (seconds: number): string => {
  const mmNum = Math.floor(seconds / 60);
  const ssNum = seconds % 60;
  const mm = String(mmNum).padStart(2, "0");
  const ss = String(ssNum).padStart(2, "0");
  return `${mm}:${ss}`;
};

export const formatDate = (date: Date): string => {
  const yyyy = String(date.getFullYear()).padStart(4, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

export const formatDateToJP = (date: Date): string => {
  return date.toLocaleDateString("ja-JP", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
};

export const formatDateStringToRFC3339 = (date: string): string => {
  return date + "T00:00:00Z";
};
