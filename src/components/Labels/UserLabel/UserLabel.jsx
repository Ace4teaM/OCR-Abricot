import { memo } from 'react';
import styles from './UserLabel.module.css';
import {BaseLabel} from '@/components/Labels'

const UserLabel = ({
  user={
    name:"Albert Dupontel"
  },
  withBorder=false,
  ...props
}) => {
  const firstname = user.name.split(' ', 2)[0] ?? ""
  const lastname = user.name.split(' ', 2)[1] ?? ""

  return (
    <BaseLabel
      className={`${styles.container} ${withBorder ? styles.containerBorder : ''}`}
      title={user.name}
      {...props}
    >
      {firstname.at(0).toUpperCase()}{lastname.at(0).toUpperCase()}
    </BaseLabel>
  );
};

export default memo(UserLabel);