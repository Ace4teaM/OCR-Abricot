import { memo } from 'react';
import styles from './TaskCard.module.css';
import {BaseCard} from '@/components/Cards'
import {TagLabel} from '@/components/Labels'
import {Button} from '@/components/Buttons'
import {FolderOpen, CalendarDays, MessageSquareText} from 'lucide-react';

const TaskCard = ({
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
          <TagLabel className={styles.tag} color="red">A Faire</TagLabel>
        </header>
        <section>
          <FolderOpen></FolderOpen> Nom du projet | <CalendarDays></CalendarDays> 9 mars | <MessageSquareText></MessageSquareText> 2
        </section>
        <footer>
          <Button className={styles.button}>Voir</Button>
        </footer>
      </div>
    </BaseCard>
  );
};

export default memo(TaskCard);