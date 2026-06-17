import { memo } from 'react';
import styles from './UserLabel.module.css';
import {BaseLabel} from '@/components/Labels'

const UserLabel = ({
  firstname="Albert",
  lastname="Dupontel",
  withBorder=false,
  ...props
}) => {
  return (
    <BaseLabel
      className={`${styles.container} ${withBorder ? styles.containerBorder : ''}`}
      {...props}
    >
      {firstname.at(0).toUpperCase()}{lastname.at(0).toUpperCase()}
    </BaseLabel>
  );
};

export default memo(UserLabel);