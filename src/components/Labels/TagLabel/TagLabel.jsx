import { memo } from 'react';
import styles from './TagLabel.module.css';

const TagLabel = ({
  children = "label",
  color = "green",
  ...props
}) => {

  return (
    <span
      className={styles.container}
      data-color={color}
      {...props}
    >{children}</span>
  );
};

export default memo(TagLabel);