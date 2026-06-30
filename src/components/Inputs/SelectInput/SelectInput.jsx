"use client"
import { memo, useState, useEffect, useRef } from 'react';
import styles from './SelectInput.module.css';
import { Search } from 'lucide-react';

/**
 * @param {string} className - classe de style
 */
const Select = ({
  error = "",
  invalid = false,
  value = "",
  setValue = () => {},
  onValidate = (val) => {},
  ...props
}) => {

  const inputRef = useRef()

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      if(value.trim() != "")
        onValidate(value.trim())
    }
  }

  const onButtonDown = (e) => {
    if (value.trim() != "") {
        onValidate(value.trim())
    }
  }

  useEffect(()=>{
    console.log("invalid", invalid, error)
    if(inputRef.current != undefined)
    {
      inputRef.current.setCustomValidity(error);
      
      if(invalid)
        inputRef.current.reportValidity()
    }
  }, [invalid, error])

  return (
    <div className={styles.container}>
      <input ref={inputRef} className={styles.searchInput} type="text" value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={onKeyDown} {...props}></input>
      <Search className={styles.searchIcon} size={14} onClick={onButtonDown}></Search>
    </div>
  );
};

export default memo(Select);