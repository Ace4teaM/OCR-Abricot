import { memo } from 'react';
import styles from './IconButton.module.css';
import * as Icons from "lucide-react";
import {MoveLeft, Ellipsis} from "lucide-react";

const IconButton = ({
  className = "",
  iconName = "Ellipsis",
  ...props
}) => {

  const iconsPredefined = {
    "<-": MoveLeft,
    "...": Ellipsis,
  };

  const Icon = iconsPredefined[iconName] || Icons[iconName];

  return (
    <span
      className={`${styles.container} ${className}`}
      {...props}
    >{Icon && <Icon className={styles.icon} />}</span>
  );
};

export default memo(IconButton);