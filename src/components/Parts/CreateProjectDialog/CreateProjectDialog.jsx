"use client"

import { memo, useState, useEffect } from 'react';
import styles from './CreateProjectDialog.module.css';
import {Button} from "@/components/Buttons";
import {SelectUsersInput} from "@/components/Parts";
import {usePost} from "@/hooks/Http";
import {ErrorMessage} from "@/components/Parts";
import { useAuth } from "@/contexts/AuthContext";

const CreateProjectDialog = ({
  setDialogResult,
  ...props
}) => {
  const { isLogged, userData } = useAuth()

/*
{
  "name": "Mon Projet",
  "description": "Description du projet",
  "contributors": [
    "user1@example.com",
    "user2@example.com"
  ]
}
*/
  const [ data, setData ] = useState(null)
  const create = usePost("projects", data, process.env.NEXT_PUBLIC_USER_API_URL)

  useEffect(()=>{
    if(create.hasData == false || create.data.length == 0)
      return

    console.log("create.data", create.data)

    if(create.data.success)
    {
      // déclenche la fermeture du dialogue
      setDialogResult(true);
    }
    else{
      /* gestion des erreurs */
    }
  }, [create.hasData])

  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche la soumission du formulaire
    
    const formData = new FormData(e.target.form)
    const data = Object.fromEntries(formData.entries())
    data.contributors = data.contributors.trim()
    if(data.contributors !== "")
      data.contributors = data.contributors.split(" ")

    setData(data);
    console.log(data);
  };

  return (
    <div className={styles.content}>
      <h2>Créer un projet</h2>
      <form>
        <label>Titre</label>
        <input required type='text' name="name"></input>
        <label>Description</label>
        <input required type='text' name="description"></input>
        <label>Contributeurs :</label>
        <SelectUsersInput name="contributors" placeholder="Choisir un ou plusieurs collaborateurs" excludeUsers={[userData]}></SelectUsersInput>
        <div className={styles.footer}>
          <Button onClick={(e)=>handleSubmit(e)}>Ajouter un projet</Button>
        </div>
      </form>
      <ErrorMessage active={create.error} data={create.data}></ErrorMessage>
    </div>
  );
};

export default memo(CreateProjectDialog);