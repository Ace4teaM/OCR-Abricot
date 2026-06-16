import { memo } from 'react';
import styles from './TagLabel.module.css';
import {BaseLabel} from '@/components/Labels'

const TagLabel = ({
  ...props
}) => {

  return (
    <BaseLabel
      className={styles.container}
      {...props}
    ></BaseLabel>
  );
};

export default memo(TagLabel);