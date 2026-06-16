import { memo } from 'react';
import styles from './BaseCard.module.css';

/**
 * @param {string} width - largeur de la boite (CSS)
 * @param {string} height - hauteur de la boite (CSS)
 */
const BaseCard = ({
  width="auto",
  height="auto",
  children,
  ...props
}) => {

  return (
    <div className={styles.container} style={{ width, height }}>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default memo(BaseCard);