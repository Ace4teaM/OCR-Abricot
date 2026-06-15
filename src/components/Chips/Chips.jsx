import { memo } from 'react';
import styles from './Chips.module.css';
import { SquareCheckBig, CalendarDays, FolderOpen } from 'lucide-react';

const Chips = ({
  children = "Mes tâches",
  type = "",
  ...props
}) => {

  const Icons = {
    "task": <SquareCheckBig></SquareCheckBig>,
    "kaban": <CalendarDays></CalendarDays>,
    "project": <FolderOpen></FolderOpen>,
  }
  const Icon = Icons[type];

  return (
    <button
      className={styles.container}
      {...props}
    >{Icon && <span className={styles.icon}>{Icon}</span>}{children}</button>
  );
};

export default memo(Chips);