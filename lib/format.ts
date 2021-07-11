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
