import { Dispatch, FC, MouseEventHandler, SetStateAction, useState } from "react";

import DatePicker from "@/components/common/DateField/DatePicker";
import IconButton from "@/components/common/IconButton";
import * as s from "./DateField.css";
import { formatDate } from "@/lib/formatDate";

type Props = {
  value: Date | null;
  setValue: Dispatch<SetStateAction<Date | null>>;
  icon: JSX.Element;
  label: string;
};

const DateField: FC<Props> = ({ value, setValue, icon, label }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className={s.container}>
      <IconButton icon={icon} label={label} onClick={toggleMenu} />
      {isMenuOpen && <DatePicker setValue={setValue} />}
      {value !== null ? formatDate(value, "yyyy-mm-dd").split("-").join("/") : ""}
    </div>
  );
};

export default DateField;
