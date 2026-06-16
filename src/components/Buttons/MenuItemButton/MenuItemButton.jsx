import { memo } from 'react';
import styles from './MenuItemButton.module.css';
import * as Icons from "lucide-react";
import {CalendarDays, FolderOpen} from "lucide-react";

const MenuItemButton = ({
  className = "",
  iconName = "LayoutDashboard",
  children = "Tableau de bord",
  ...props
}) => {

  const iconsPredefined = {
    "dashboard": CalendarDays,
    "project": FolderOpen,
  };


  const Icon = iconsPredefined[iconName] || Icons[iconName];


  return (
    <span
      className={`${styles.container} ${className}`}
      {...props}
    >{Icon && <Icon className={styles.icon} />} {children}</span>
  );
};

export default memo(MenuItemButton);