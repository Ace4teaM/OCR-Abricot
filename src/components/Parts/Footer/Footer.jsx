import { memo } from 'react';
import styles from './Footer.module.css';
import {Abricot} from '@/components/Icons'

const Footer = ({
  ...props
}) => {

  return (
    <nav
      className={styles.container}
      {...props}
    >
      <Abricot width={101} height={13} color="black"></Abricot>
      <span>Abricot 2025</span>
    </nav>
  );
};

export default memo(Footer);