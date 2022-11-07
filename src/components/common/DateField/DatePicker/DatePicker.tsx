import {
  ChangeEventHandler,
  Dispatch,
  FC,
  MouseEventHandler,
  SetStateAction,
  useState,
} from "react";

import IconButton from "@/components/common/IconButton";
import DateButton from "@/components/common/DateField/DatePicker/DateButton";
import { NavigateBeforeIcon, NavigateNextIcon } from "@/components/common/icons";
import * as s from "./DatePicker.css";
import { formatDate } from "@/lib/formatDate";

type Props = {
  setValue: Dispatch<SetStateAction<Date | null>>;
};

const DatePicker: FC<Props> = ({ setValue }) => {
  const now = new Date();
  const [displayingDate, setDisplayingDate] = useState(
    new Date(now.getFullYear(), now.getMonth(), 1),
  );

  const getSelectOptionValues = (displayingDate: Date): Date[] => {
    const year = Number(displayingDate.getFullYear());
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((month) => new Date(year, month, 1));
  };

  const handleSelectChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const year = Number(e.target.value.split("-")[0]);
    const month = Number(e.target.value.split("-")[1]);
    const date = Number(e.target.value.split("-")[2]);
    setDisplayingDate(new Date(year, month - 1, date));
  };

  const handleBeforeButtonClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setDisplayingDate((prev) => {
      const year = Number(prev.getFullYear());
      const month = Number(prev.getMonth());
      const date = Number(prev.getDate());
      return month === 0 ? new Date(year - 1, 11, date) : new Date(year, month - 1, date);
    });
  };

  const handleNextButtonClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setDisplayingDate((prev) => {
      const year = Number(prev.getFullYear());
      const month = Number(prev.getMonth());
      const date = Number(prev.getDate());
      return month === 11 ? new Date(year + 1, 1, date) : new Date(year, month + 1, date);
    });
  };

  const getDates = (date: Date): (Date | null)[] => {
    const results = [];

    // その月の初めの曜日からresultsに空白の日を追加する
    const dayOfWeek = date.getDay();
    for (let i = 0; i < dayOfWeek; i++) {
      results.push(null);
    }

    // その月の日数を求めて、resultsに追加する。
    const monthlyDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const year = date.getFullYear();
    if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
      monthlyDays[1] = 29;
    }
    for (let i = 1; i <= monthlyDays[date.getMonth()]; i++) {
      results.push(new Date(year, date.getMonth(), i));
    }

    return results;
  };

  return (
    <div className={s.container}>
      <div className={s.header}>
        <select
          value={formatDate(displayingDate, "yyyy-mm-dd")}
          onChange={handleSelectChange}
          className={s.menuButton}
        >
          {getSelectOptionValues(displayingDate).map((d) => (
            <option key={d.toUTCString()} value={formatDate(d, "yyyy-mm-dd")}>
              {formatDate(d, "年月")}
            </option>
          ))}
        </select>
        <div className={s.spacer} />
        <IconButton
          icon={<NavigateBeforeIcon />}
          label="前の月へ"
          onClick={handleBeforeButtonClick}
        />
        <IconButton icon={<NavigateNextIcon />} label="次の月へ" onClick={handleNextButtonClick} />
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
        {getDates(displayingDate).map((date, i) => (
          <DateButton
            key={i}
            date={date}
            handleClick={(e) => {
              e.preventDefault();
              setValue(date);
            }}
          />
        ))}
      </ul>
    </div>
  );
};

export default DatePicker;
