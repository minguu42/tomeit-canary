import React, { useState } from "react";

import { DateButton } from "@/components/DateField/DatePicker/DateButton";
import { IconButton } from "@/components/IconButton";
import { NavigateBeforeIcon, NavigateNextIcon } from "@/components/icons";
import { formatDate } from "@/lib/formatDate";
import * as s from "./DatePicker.css";

type Props = {
  setValue: React.Dispatch<React.SetStateAction<Date | null>>;
};

export const DatePicker: React.FC<Props> = ({ setValue }) => {
  const now = new Date();
  const [displayingDate, setDisplayingDate] = useState(
    new Date(now.getFullYear(), now.getMonth() + 1),
  );

  const getSelectOptionValues = (displayingDate: Date): Date[] => {
    const y = Number(displayingDate.getFullYear());
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((m) => new Date(y, m, 1));
  };

  const handleSelectChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const y = Number(e.target.value.split("-")[0]);
    const m = Number(e.target.value.split("-")[1]);
    const d = Number(e.target.value.split("-")[2]);
    setDisplayingDate(new Date(y, m - 1, d));
  };

  const handleBeforeButtonClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setDisplayingDate((prev) => {
      const y = Number(prev.getFullYear());
      const m = Number(prev.getMonth());
      const d = Number(prev.getDate());
      return m === 0 ? new Date(y - 1, 11, d) : new Date(y, m - 1, d);
    });
  };

  const handleNextButtonClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setDisplayingDate((prev) => {
      const y = Number(prev.getFullYear());
      const m = Number(prev.getMonth());
      const d = Number(prev.getDate());
      return m === 11 ? new Date(y + 1, 0, d) : new Date(y, m + 1, d);
    });
  };

  const getDates = (d: Date): (Date | null)[] => {
    const ds = [];

    const dayOfWeek = d.getDay();
    for (let i = 0; i < dayOfWeek; i++) {
      ds.push(null);
    }

    const monthlyDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const y = d.getFullYear();
    if (y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0)) {
      monthlyDays[1] = 29;
    }
    for (let i = 1; i <= monthlyDays[d.getMonth()]; i++) {
      ds.push(new Date(y, d.getMonth(), i));
    }

    return ds;
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
          type="button"
        />
        <IconButton
          icon={<NavigateNextIcon />}
          label="次の月へ"
          onClick={handleNextButtonClick}
          type="button"
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
        {getDates(displayingDate).map((d, i) => (
          <DateButton
            key={i}
            date={d}
            onClick={(e) => {
              e.preventDefault();
              setValue(d);
            }}
          />
        ))}
      </ul>
    </div>
  );
};
