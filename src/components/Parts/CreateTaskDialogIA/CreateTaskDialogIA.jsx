import { memo } from 'react';
import styles from './CreateTaskDialogIA.module.css';
import {Button} from "@/components/Buttons";
import {EditTaskCard} from "@/components/Cards";

const CreateTaskDialogIA = ({
  setDialogResult,
  ...props
}) => {

  const taskList = [
  ];

  const handleSubmit = (e) => {
  };

  return (
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
  );
};

export default memo(CreateTaskDialogIA);