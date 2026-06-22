import { memo } from 'react';
import styles from './IAButton.module.css';
import {BaseButton} from '@/components/Buttons'
import {IA} from '@/components/Icons'

const IAButton = ({
  ...props
}) => {
  return (
    <BaseButton
      className={styles.container}
      {...props}
    >
      <IA color="white"></IA>
    </BaseButton>
  );
};

export default memo(IAButton);