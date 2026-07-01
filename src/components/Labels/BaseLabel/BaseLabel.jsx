import { memo } from 'react';
import styles from './BaseLabel.module.css';

const BaseLabel = ({
  className = "",
  children = "label",
  color = "green",
  ...props
}) => {

  const resolvedColor =
    typeof color === "function" ? color() : color;

  return (
    <span
      className={`${styles.container} ${className}`}
      data-color={resolvedColor}
      {...props}
    >{children}</span>
  );
};

export default memo(BaseLabel);