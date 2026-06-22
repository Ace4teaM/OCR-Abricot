import { memo } from 'react';
import styles from './UpdateProjectDialog.module.css';
import Image from 'next/image'
import {Button} from "@/components/Buttons";
import {TagLabel} from "@/components/Labels";
import {SelectInput} from "@/components/Inputs";
import {ModalDialog} from "@/components/Containers";

const UpdateProjectDialog = ({
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
        <h2>Modifier un projet</h2>
        <form>
          <label>Titre</label>
          <input required type='text'></input>
          <label>Description</label>
          <input required type='text'></input>
          <label>Contributeurs :</label>
          <SelectInput placeholder="Choisir un ou plusieurs collaborateurs"></SelectInput>
        </form>
        <div className={styles.footer}>
          <Button onClick={(e)=>handleSubmit(e)}>Enregistrer</Button>
        </div>
      </div>
    </ModalDialog>
  );
};

export default memo(UpdateProjectDialog);