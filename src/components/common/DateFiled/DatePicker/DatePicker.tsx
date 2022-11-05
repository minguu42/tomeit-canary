import {
  ChangeEventHandler,
  Dispatch,
  FC,
  MouseEventHandler,
  SetStateAction,
  useState,
} from "react";

import IconButton from "@/components/common/IconButton";
import { NavigateBeforeIcon, NavigateNextIcon } from "@/components/common/icons";
import * as s from "./DatePicker.css";
import { formatDate } from "@/lib/formatDate";
import DateButton from "@/components/common/DateFiled/DatePicker/DateButton";

type Props = {
  setValue: Dispatch<SetStateAction<string>>;
};

const DatePicker: FC<Props> = ({ setValue }) => {
  const [displayingMonth, setDisplayingMonth] = useState(formatDate(new Date(), "yyyy-mm"));

  const generateSelectItems = (yearMonth: string): string[] => {
    const year = Number(yearMonth.split("-")[0]);
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
      (month) => `${year}-${String(month).padStart(2, "0")}`,
    );
  };

  const getDaysInMonth = (year: number, month: number): number => {
    if ([1, 3, 5, 7, 8, 10, 12].indexOf(month) !== -1) {
      return 31;
    } else if ([4, 6, 9, 11].indexOf(month) !== -1) {
      return 30;
    } else if (
      month === 2 &&
      (year % 4 !== 0 || (year % 4 === 0 && year % 100 === 0 && year % 400 !== 0))
    ) {
      return 28;
    } else {
      return 29;
    }
  };

  const generateDates = (yearMonth: string): string[] => {
    const year = Number(yearMonth.split("-")[0]);
    const month = Number(yearMonth.split("-")[1]);
    const date = new Date(year, month - 1, 1);
    const results = [];

    const dayOfWeek = date.getDay();
    for (let i = 0; i < dayOfWeek; i++) {
      results.push("");
    }

    const days = getDaysInMonth(year, month);
    for (let i = 1; i <= days; i++) {
      results.push(String(i));
    }

    const rest = days % 7;
    if (rest !== 0) {
      for (let i = 0; i < 7 - rest; i++) {
        results.push("");
      }
    }

    return results;
  };

  const formatYearMonth = (yearMonth: string): string => {
    const year = yearMonth.split("-")[0];
    const month = Number(yearMonth.split("-")[1]);
    return `${year}年${month}月`;
  };

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setDisplayingMonth(e.target.value);
  };

  const handleBeforeButtonClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setDisplayingMonth((prev) => {
      const year = Number(prev.split("-")[0]);
      const month = Number(prev.split("-")[1]);
      if (month === 1) {
        return `${year - 1}-12`;
      } else {
        return `${year}-${String(month - 1).padStart(2, "0")}`;
      }
    });
  };

  const handleNextButtonClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setDisplayingMonth((prev) => {
      const year = Number(prev.split("-")[0]);
      const month = Number(prev.split("-")[1]);
      if (month === 12) {
        return `${year + 1}-01`;
      } else {
        return `${year}-${String(month + 1).padStart(2, "0")}`;
      }
    });
  };

  return (
    <div className={s.container}>
      <div className={s.surfaceTint}>
        <div className={s.header}>
          <select value={displayingMonth} onChange={handleChange} className={s.menuButton}>
            {generateSelectItems(displayingMonth).map((v) => (
              <option value={v} key={v}>
                {formatYearMonth(v)}
              </option>
            ))}
          </select>
          <div className={s.spacer} />
          <IconButton
            icon={<NavigateBeforeIcon />}
            label="前の月へ"
            onClick={handleBeforeButtonClick}
          />
          <IconButton
            icon={<NavigateNextIcon />}
            label="次の月へ"
            onClick={handleNextButtonClick}
          />
        </div>
        <ul className={s.weekdays}>
          <li className={s.weekdaysItem}>日</li>
          <li className={s.weekdaysItem}>月</li>
          <li className={s.weekdaysItem}>火</li>
          <li className={s.weekdaysItem}>水</li>
          <li className={s.weekdaysItem}>木</li>
          <li className={s.weekdaysItem}>金</li>
          <li className={s.weekdaysItem}>土</li>
        </ul>
        <ul className={s.dateList}>
          {generateDates(displayingMonth).map((date, i) => (
            <DateButton
              date={date}
              handleClick={(e) => {
                e.preventDefault();
                setValue(`${displayingMonth}-${date}`);
              }}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DatePicker;
