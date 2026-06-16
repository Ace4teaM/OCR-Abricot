import { memo } from 'react';
import styles from './UserLabel.module.css';
import {BaseLabel} from '@/components/Labels'

const UserLabel = ({
  firstname="Albert",
  lastname="Dupontel",
  ...props
}) => {
  return (
    <BaseLabel
      className={styles.container}
      {...props}
    >
      {firstname.at(0).toUpperCase()}{lastname.at(0).toUpperCase()}
    </BaseLabel>
  );
};

export default memo(UserLabel);