import { memo } from 'react';
import styles from './UserButton.module.css';
import {BaseButton} from '@/components/Buttons'

const UserButton = ({
  firstname="Albert",
  lastname="Dupontel",
  ...props
}) => {
  return (
    <BaseButton
      className={styles.container}
      {...props}
    >
      {firstname.at(0).toUpperCase()}{lastname.at(1).toUpperCase()}
    </BaseButton>
  );
};

export default memo(UserButton);