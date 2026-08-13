import React, { ReactNode } from "react";
import styles from "../css/Button.module.css";

type Props = {
  children: ReactNode;
  onClick?: (e: React.FormEvent<HTMLFormElement>) => void;
  type: string;
};
export default function Button({ children, onClick, type }: Props) {
  return (
    <button className={`${styles.btn} ${styles[type]}`} onClick={onClick}>
      {children}
    </button>
  );
}
