import { Dispatch, FC, MouseEventHandler, SetStateAction, useState } from "react";

import { DatePicker } from "@/components/DateField/DatePicker";
import { IconButton } from "@/components/IconButton";
import * as s from "./DateField.css";
import { formatDate } from "@/lib/formatDate";

type Props = {
  value: Date | null;
  setValue: Dispatch<SetStateAction<Date | null>>;
  icon: JSX.Element;
  label: string;
};

export const DateFiled = ({ value, setValue, icon, label }: Props): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu: MouseEventHandler<HTMLButtonElement> = (e) => {
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
