import { memo } from 'react';
import styles from './BaseLabel.module.css';

const BaseLabel = ({
  className = "",
  children = "label",
  color = "green",
  ...props
}) => {

  return (
    <span
      className={`${styles.container} ${className}`}
      data-color={color}
      {...props}
    >{children}</span>
  );
};

export default memo(BaseLabel);