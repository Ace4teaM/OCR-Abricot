import { memo } from 'react';
import styles from './BaseButton.module.css';

/**
 * @param {string} className - classe de style
 */
const BaseButton = ({
  className="",
  children,
  ...props
}) => {

  return (
    <button className={`${styles.container} ${className}`}>
      {children}
    </button>
  );
};

export default memo(BaseButton);