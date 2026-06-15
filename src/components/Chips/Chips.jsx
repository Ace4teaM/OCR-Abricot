import { memo } from 'react';
import styles from './Chips.module.css';

const Chips = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <button
      {...props}
    >{children}</button>
  );
};

export default memo(Chips);