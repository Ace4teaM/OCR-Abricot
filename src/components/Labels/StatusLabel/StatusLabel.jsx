import { memo } from 'react';
import styles from './StatusLabel.module.css';
import {BaseLabel} from '@/components/Labels'
import { TASK_STATUS } from "@/constants/taskStatus";

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
  
  const text = () => {
    switch(status){
      case TASK_STATUS.TODO:
        return "À faire";
      case TASK_STATUS.DONE:
        return "Terminée";
      case TASK_STATUS.IN_PROGRESS:
        return "En cours";
    }
    return "???";
  }

  return (
    <BaseLabel
      className={`${styles.container} ${withBorder ? styles.containerBorder : ''}  ${className}`}
      color={color}
      {...props}
    >
      {text()}
    </BaseLabel>
  );
};

export default memo(StatusLabel);