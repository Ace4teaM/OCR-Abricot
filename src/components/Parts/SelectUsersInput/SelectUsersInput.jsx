"use client"

import { memo, useState, useEffect, useRef } from 'react';
import styles from './SelectUsersInput.module.css';
import {SelectInput} from '@/components/Inputs'
import {BaseLabel} from '@/components/Labels'
import {useFetch} from "@/hooks/Http";
import { X } from 'lucide-react';

const SelectUsersInput = ({
  excludeUsers = [],
  placeholder = "Choisir un ou plusieurs collaborateurs",
  name = "contributors"
}) => {

  const selectRef = useRef()

  const [ url, setUrl ] = useState(null)
  const create = useFetch(url, process.env.NEXT_PUBLIC_USER_API_URL)

  const [selection, setSelection] = useState([])

  const [value, setValue] = useState("")

  const [errorMessage, setErrorMessage] = useState("")
  const [errorState, setErrorState] = useState(false)

  useEffect(()=>{
    if(create.hasData == false || create.data.length == 0)
      return

    let message = ""
    let users = []

    if(create.data.success)
    {
      create.data.data.users.forEach(element => {
        if(!selection.some(user => user.email === element.email) && !excludeUsers.some(user => user.email === element.email))
        {
          users.push(element)
        }
        else
        {
          if(selection.some(user => user.email === element.email))
            message += element.name + " est déjà dans la sélection. "
          else
            message += element.name + " ne peut pas être ajouté à la sélection. "
        }
      });
    }

    if(create.error && typeof(create.data.data) === "string"){
      message = create.data.data
    }

    setErrorMessage(message)
    setErrorState(message.length > 0)

    if(users.length > 0)
    {
        setSelection([...selection, ...users])
        setValue("")
    }
  }, [create.hasData])

  const onValidate = (val) => {
    const query = encodeURIComponent(val.trim())
    const newUrl = `users/search?query=${query}`
    if(newUrl != url)
      setUrl(newUrl);
    else
      create.retry() // force le renvoi
  };

  return (
    <>
     <input type="hidden" name={name} value={selection.map(user => user.email).join(" ")} readOnly></input>
     <SelectInput ref={selectRef} invalid={errorState} error={errorMessage} placeholder={placeholder} value={value} setValue={setValue} onValidate={onValidate} disabled={create.isLoading}></SelectInput>
     <div className={styles.selection}>
      {selection.map((sel)=>
          <BaseLabel key={sel.id} color="blue" onClick={(e)=>setSelection(selection.filter(e => e.name !== sel.name))}>{sel.name}&nbsp;&nbsp;<X size="16"></X></BaseLabel>
      )}
     </div>
    </>
  );
};

export default memo(SelectUsersInput);