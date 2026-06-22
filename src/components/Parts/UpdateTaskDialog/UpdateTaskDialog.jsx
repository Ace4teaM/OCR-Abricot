import { memo } from 'react';
import styles from './UpdateTaskDialog.module.css';
import Image from 'next/image'
import {Button} from "@/components/Buttons";
import {TagLabel} from "@/components/Labels";
import {SelectInput} from "@/components/Inputs";
import {ModalDialog} from "@/components/Containers";

const UpdateTaskDialog = ({
  ...props
}) => {

  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche la soumission du formulaire
    
    const formData = new FormData(e.target.form)
    const data = Object.fromEntries(formData.entries())

    console.log(data);
  };

  return (
    <ModalDialog {...props}>
      <div className={styles.content}>
        <h2>Modifier une tâche</h2>
        <form>
          <label>Titre</label>
          <input required type='text'></input>
          <label>Description</label>
          <input required type='text'></input>
          <label>Échéance</label>
          <input required type='date'></input>
          <label>Assigné à :</label>
          <SelectInput placeholder="Choisir un ou plusieurs collaborateurs"></SelectInput>
          <label>Statut :</label>
          <div className={styles.tags}>
            <TagLabel>À faire</TagLabel>
            <TagLabel>En cours</TagLabel>
            <TagLabel>Terminée</TagLabel>
          </div>
        </form>
        <div className={styles.footer}>
          <Button onClick={(e)=>handleSubmit(e)}>Enregistrer</Button>
        </div>
      </div>
    </ModalDialog>
  );
};

export default memo(UpdateTaskDialog);