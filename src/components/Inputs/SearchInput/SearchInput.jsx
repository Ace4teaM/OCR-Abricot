"use client"
import { memo, useState, useEffect, useRef } from 'react';
import styles from './SearchInput.module.css';
import { Search } from 'lucide-react';

/**
 * @param {string} className - classe de style
 */
const SearchInput = ({
  onChange=(val)=>{},
  ...props
}) => {

  const [value, setValue] = useState("")

  const previousValue = useRef();


  useEffect(()=>{
    if(previousValue.current !== undefined && value != previousValue.current)
      onChange(value)
    previousValue.current = value;
  },[value])

  return (
    <div className={styles.container}>
      <input className={styles.searchInput} type="text" placeholder="Rechercher une tâche" value={value} onChange={(e) => setValue(e.target.value)} {...props}></input>
      <Search className={styles.searchIcon} size={14}></Search>
    </div>
  );
};

export default memo(SearchInput);