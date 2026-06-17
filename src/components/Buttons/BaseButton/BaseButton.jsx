import { memo } from 'react';
import styles from './BaseButton.module.css';

/**
 * @param {string} className - classe de style
 */
const BaseButton = ({
  className="",
  as = "button",
  children,
  ...props
}) => {

  const BaseType = as;

  return (
    <BaseType className={`${styles.container} ${className}`} {...props}>
      {children}
    </BaseType>
  );
};

export default memo(BaseButton);