import { memo } from 'react';
import styles from './MainMenu.module.css';
import {MenuItemButton, UserButton} from '@/components/Buttons'
import {Abricot} from '@/components/Icons'
import Link from 'next/link'

const MainMenu = ({
  ...props
}) => {

  return (
    <nav
      className={styles.container}
      {...props}
    >
        <Link href="/"><Abricot width={147} height={18} color="#D3590B"></Abricot></Link>
        <div>
            <Link href="/dashboard"><MenuItemButton iconName = "dashboard" as="span">Tableau de bord</MenuItemButton></Link>
            <Link href="/projects"><MenuItemButton iconName = "project" as="span">Projets</MenuItemButton></Link>
        </div>
        <Link href="/account"><UserButton as="span"></UserButton></Link>
    </nav>
  );
};

export default memo(MainMenu);