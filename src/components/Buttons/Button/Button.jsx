import { memo } from 'react';
import styles from './Button.module.css';
import {BaseButton} from '@/components/Buttons'

const Button = ({
  className = "",
  children = "Label",
  ...props
}) => {

  return (
    <BaseButton
      className={`${styles.container} ${className}`}
      {...props}
    >{children}</BaseButton>
  );
};

export default memo(Button);