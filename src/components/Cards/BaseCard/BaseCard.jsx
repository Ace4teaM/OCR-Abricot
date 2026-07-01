import { memo } from 'react';
import styles from './BaseCard.module.css';

/**
 * @param {string} width - largeur de la boite (CSS)
 * @param {string} height - hauteur de la boite (CSS)
 */
const BaseCard = ({
  className="",
  width="auto",
  height="auto",
  children,
  ...props
}) => {

  return (
    <div className={`${styles.container} ${className}`} style={{ width, height }}>
        {children}
    </div>
  );
};

export default memo(BaseCard);