import { memo } from 'react';
import styles from './Tag.module.css';

const Tag = ({
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

export default memo(Tag);