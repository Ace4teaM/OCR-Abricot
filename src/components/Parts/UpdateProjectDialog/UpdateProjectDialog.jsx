import { memo } from 'react';
import styles from './UpdateProjectDialog.module.css';
import {Button} from "@/components/Buttons";
import {SelectInput} from "@/components/Inputs";

const UpdateProjectDialog = ({
  setDialogResult,
  ...props
}) => {

  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche la soumission du formulaire
    
    const formData = new FormData(e.target.form)
    const data = Object.fromEntries(formData.entries())

    console.log(data);
  };

  return (
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
  );
};

export default memo(UpdateProjectDialog);