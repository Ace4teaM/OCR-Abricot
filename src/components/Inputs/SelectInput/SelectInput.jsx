"use client"
import { memo, useState, useEffect, useRef } from 'react';
import styles from './SelectInput.module.css';
import {ChevronUp, ChevronDown, X} from 'lucide-react';

/**
 * @param {string} className - classe de style
 */
const SelectInput = ({
  onChange=(val)=>{},
  values={},
  labels={},
  placeholder="Choix...",
  defaultValue="",
  ...props
}) => {

  const [value, setValue] = useState(defaultValue)

  const [show, setShow] = useState(false)

  const previousValue = useRef();


  useEffect(()=>{
    if(previousValue.current !== undefined && value != previousValue.current)
      onChange(value)
    previousValue.current = value;
  },[value])

  return (
    <div className={styles.container}>
      <input className={styles.searchInput} type="text" readOnly placeholder={placeholder} onClick={(e)=>setShow(!show)} value={value} {...props}></input>
      {show === false && <ChevronUp className={styles.searchIcon} size={24} onClick={(e)=>setShow(true)}></ChevronUp>}
      {show === true && <ChevronDown className={styles.searchIcon} size={24} onClick={(e)=>setShow(false)}></ChevronDown>}
      {show === true && <div className={styles.valuesContainer}>
        <div className={styles.value} onClick={(e)=>{setValue(""); setShow(false)}}><X size={16}></X>Supprimer le filtre</div>
        {Object.entries(values).map(([key, value]) => 
          <div key={key} className={styles.value} onClick={(e)=>{setValue(value); setShow(false)}}>{Object.hasOwn(labels,key) ? labels[key] : value}</div>
        )}
      </div>}
    </div>
  );
};

export default memo(SelectInput);