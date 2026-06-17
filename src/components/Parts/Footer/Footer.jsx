import { memo } from 'react';
import styles from './Footer.module.css';
import Image from 'next/image'

const Footer = ({
  ...props
}) => {

  return (
    <nav
      className={styles.container}
      {...props}
    >
        <Image src="/logo_black.png" alt="logo" width={101} height={13}></Image>
        <span>Abricot 2025</span>
    </nav>
  );
};

export default memo(Footer);