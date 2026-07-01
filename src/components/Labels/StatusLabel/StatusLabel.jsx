import { memo } from 'react';
import styles from './StatusLabel.module.css';
import {BaseLabel} from '@/components/Labels'
import { TASK_STATUS, TASK_STATUS_LABELS } from "@/constants/taskStatus";

const StatusLabel = ({
  className = "",
  
  status="IN_PROGRESS",
  color = () => {
    switch(status){
      case TASK_STATUS.TODO:
        return "red";
      case TASK_STATUS.DONE:
        return "green";
      case TASK_STATUS.IN_PROGRESS:
        return "yellow";
    }
    return "green";
  },
  withBorder=false,
  ...props
}) => {
  
  return (
    <BaseLabel
      className={`${styles.container} ${withBorder ? styles.containerBorder : ''}  ${className}`}
      color={color}
      {...props}
    >
      {TASK_STATUS_LABELS[status]}
    </BaseLabel>
  );
};

export default memo(StatusLabel);