import { memo } from 'react';
import styles from './CreateProjectDialog.module.css';
import Image from 'next/image'
import {Button} from "@/components/Buttons";
import {TagLabel} from "@/components/Labels";
import {SelectInput} from "@/components/Inputs";
import {ModalDialog} from "@/components/Containers";

const CreateProjectDialog = ({
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
        <h2>Créer un projet</h2>
        <form>
          <label>Titre</label>
          <input required type='text'></input>
          <label>Description</label>
          <input required type='text'></input>
          <label>Contributeurs :</label>
          <SelectInput placeholder="Choisir un ou plusieurs collaborateurs"></SelectInput>
        </form>
        <div className={styles.footer}>
          <Button onClick={(e)=>handleSubmit(e)}>Ajouter un projet</Button>
        </div>
      </div>
    </ModalDialog>
  );
};

export default memo(CreateProjectDialog);