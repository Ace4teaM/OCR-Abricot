import { memo } from 'react';
import styles from './SelectInput.module.css';
import { Search } from 'lucide-react';

/**
 * @param {string} className - classe de style
 */
const Select = ({
  ...props
}) => {

  return (
    <div className={styles.container}>
      <input className={styles.searchInput} type="text" placeholder="Rechercher une tâche" {...props}></input>
      <Search className={styles.searchIcon} size={14}></Search>
    </div>
  );
};

export default memo(Select);