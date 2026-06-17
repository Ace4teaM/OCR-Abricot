import { memo } from 'react';
import styles from './MainMenu.module.css';
import {MenuItemButton, UserButton} from '@/components/Buttons'
import Image from 'next/image'

const MainMenu = ({
  ...props
}) => {

  return (
    <nav
      className={styles.container}
      {...props}
    >
        <Image src="/logo_orange.png" width={147} height={18}></Image>
        <div>
            <MenuItemButton iconName = "dashboard" as="span">Tableau de bord</MenuItemButton>
            <MenuItemButton iconName = "project" as="span">Projets</MenuItemButton>
        </div>
        <UserButton as="span"></UserButton>
    </nav>
  );
};

export default memo(MainMenu);