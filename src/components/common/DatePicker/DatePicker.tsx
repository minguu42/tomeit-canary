import { Dispatch, FC, MouseEventHandler, SetStateAction, useState } from "react";

import IconButton from "@/components/common/DatePicker/IconButton";
import * as s from "./DatePicker.css";
import Menu from "@/components/common/DatePicker/Menu";

type Props = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  icon: JSX.Element;
  label: string;
};

const DatePicker: FC<Props> = ({ value, setValue, icon, label }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className={s.container}>
      <IconButton icon={icon} label={label} onClick={toggleMenu} />
      {isMenuOpen && <Menu setValue={setValue} />}
      {value.split("-").join("/")}
    </div>
  );
};

export default DatePicker;
