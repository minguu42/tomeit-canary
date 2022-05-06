export const formatSecondsToMinutesSeconds = (seconds: number): string => {
  const mmNum = Math.floor(seconds / 60);
  const ssNum = seconds % 60;
  const mm = String(mmNum).padStart(2, "0");
  const ss = String(ssNum).padStart(2, "0");
  return `${mm}:${ss}`;
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
