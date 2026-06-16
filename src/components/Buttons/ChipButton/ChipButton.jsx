import { memo } from 'react';
import styles from './ChipButton.module.css';
import { SquareCheckBig, CalendarDays, FolderOpen } from 'lucide-react';
import {BaseButton} from '@/components/Buttons'

const ChipButton = ({
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
    <BaseButton
      className={styles.container}
      {...props}
    >{Icon && <span className={styles.icon}>{Icon}</span>}{children}</BaseButton>
  );
};

export default memo(ChipButton);