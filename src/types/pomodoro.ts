export type PomodoroRecord = {
  id: number;
  taskTitle: string;
  completedAt: Date;
};

export type NextRestCountResponse = {
  nextRestCount: number;
};

export const isNextRestCountResponse = (
  arg: unknown
): arg is NextRestCountResponse => {
  const r = arg as NextRestCountResponse;
  return typeof r?.nextRestCount === "number";
};
