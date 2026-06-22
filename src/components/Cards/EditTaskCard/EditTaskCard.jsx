import { memo } from 'react';
import styles from './EditTaskCard.module.css';
import {BaseCard} from '@/components/Cards'
import {Button} from '@/components/Buttons'
import {Trash2, Pen} from 'lucide-react';

const EditTaskCard = ({
  minWidth="380px",
  minHeight="350px",
  ...props
}) => {

  return (
    <BaseCard {...props} minWidth={minWidth} minHeight={minHeight}>
      <div className={styles.container}>
        <header>
          <h2>Nom de la tâche</h2>
          <p className={styles.description}>Description de la tâche</p>
        </header>
        <section>
          <Trash2></Trash2> Supprimer | <Pen></Pen> Modifier
        </section>
      </div>
    </BaseCard>
  );
};

export default memo(EditTaskCard);