import { useState, ChangeEventHandler } from "react";

export const useTitleInput = (
  initialState: string
): {
  title: string;
  handleTitleChange: ChangeEventHandler<HTMLInputElement>;
  resetTitle: () => void;
} => {
  const [title, setTitle] = useState(initialState);

  const handleTitleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
  };

  const resetTitle = (): void => {
    setTitle(initialState);
  };

  return { title, handleTitleChange, resetTitle };
};

export const useExpectedPomodoroNumberInput = (
  initialState: number
): {
  expectedPomodoroNumber: number;
  handleExpectedPomodoroNumberChange: ChangeEventHandler<HTMLInputElement>;
  resetExpectedPomodoroNumber: () => void;
} => {
  const [expectedPomodoroNumber, setExpectedPomodoroNumber] =
    useState(initialState);

  const handleExpectedPomodoroNumberChange: ChangeEventHandler<HTMLInputElement> =
    (e) => {
      setExpectedPomodoroNumber(Number(e.target.value));
    };

  const resetExpectedPomodoroNumber = (): void => {
    setExpectedPomodoroNumber(initialState);
  };

  return {
    expectedPomodoroNumber,
    handleExpectedPomodoroNumberChange,
    resetExpectedPomodoroNumber,
  };
};

export const useDueOnInput = (): {
  dueOn: Date | null;
  handleDueOnChange: ChangeEventHandler<HTMLInputElement>;
  resetDueOn: () => void;
} => {
  const [dueOn, setDueOn] = useState<Date | null>(null);

  const handleDueOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setDueOn(new Date(e.target.value + "T00:00:00Z"));
  };

  const resetDueOn = (): void => {
    setDueOn(null);
  };

  return { dueOn, handleDueOnChange, resetDueOn };
};
