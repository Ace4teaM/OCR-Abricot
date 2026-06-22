import { memo } from 'react';
import styles from './CreateTaskDialogIA.module.css';
import Image from 'next/image'
import {Button} from "@/components/Buttons";
import {EditTaskCard} from "@/components/Cards";
import {SelectInput} from "@/components/Inputs";
import {ModalDialog} from "@/components/Containers";

const CreateTaskDialogIA = ({
  ...props
}) => {

  const taskList = [
  ];

  const handleSubmit = (e) => {
  };

  return (
    <ModalDialog {...props}>
      <div className={styles.content}>
        {taskList.length > 0 ?
          <h2><IA color="orange"></IA>Vos tâches</h2>
          :
          <h2>Créer une tâche</h2>
        }

        <div className={styles.taskList}>
          <EditTaskCard></EditTaskCard>
          <EditTaskCard></EditTaskCard>
          <EditTaskCard></EditTaskCard>
          <EditTaskCard></EditTaskCard>
          <EditTaskCard></EditTaskCard>
        </div>
        
        <div className={styles.footer}>
          <Button onClick={(e)=>handleSubmit(e)}>+ Ajouter les tâches</Button>
        </div>
        <div className={styles.footer}>
          
        </div>
      </div>
    </ModalDialog>
  );
};

export default memo(CreateTaskDialogIA);