export const formatSecondsToMinutesSeconds = (seconds: number): string => {
  const mmNum = Math.floor(seconds / 60);
  const ssNum = seconds % 60;
  const mm = String(mmNum).padStart(2, "0");
  const ss = String(ssNum).padStart(2, "0");
  return `${mm}:${ss}`;
};

type DateFormat = "RFC3339" | "locale";
export const formatDate = (date: Date, format: DateFormat): string => {
  if (format === "RFC3339") {
    const yyyy = String(date.getFullYear());
    const MM = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const hh = String(date.getHours()).padStart(2, "0");
    const mm = String(date.getMinutes()).padStart(2, "0");
    const ss = String(date.getSeconds()).padStart(2, "0");
    const now = new Date();
    const timezoneOffsetInHours = now.getTimezoneOffset() / 60;
    const symbol = timezoneOffsetInHours >= 0 ? "+" : "-";
    const offset = String(Math.abs(timezoneOffsetInHours)).padStart(2, "0");

    return `${yyyy}-${MM}-${dd}T${hh}:${mm}:${ss}${symbol}${offset}:00`;
  } else {
    return date.toLocaleDateString("ja-JP", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  }
};
