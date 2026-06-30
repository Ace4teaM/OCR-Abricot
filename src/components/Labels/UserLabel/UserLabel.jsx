import { memo } from 'react';
import styles from './UserLabel.module.css';
import {BaseLabel} from '@/components/Labels'

const UserLabel = ({
  name="Albert Dupontel",
  withBorder=false,
  ...props
}) => {
  const firstname = name.split(' ', 2)[0] ?? ""
  const lastname = name.split(' ', 2)[1] ?? ""

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