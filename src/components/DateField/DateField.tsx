import React, { useState } from "react";

import { DatePicker } from "@/components/DateField/DatePicker";
import { IconButton } from "@/components/IconButton";
import { formatDate } from "@/lib/formatDate";
import * as s from "./DateField.css";

type Props = {
  value: Date | null;
  setValue: React.Dispatch<React.SetStateAction<Date | null>>;
  icon: JSX.Element;
  label: string;
};

export const DateFiled: React.FC<Props> = ({ value, setValue, icon, label }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className={s.container}>
      <IconButton icon={icon} label={label} type="button" onClick={toggleMenu} />
      {isMenuOpen && <DatePicker setValue={setValue} />}
      {value !== null ? formatDate(value, "yyyy-mm-dd").split("-").join("/") : ""}
    </div>
  );
};
