import { memo } from 'react';
import styles from './ProjectCard.module.css';
import {BaseCard} from '@/components/Cards'
import {TagLabel, UserLabel} from '@/components/Labels'
import {Users} from 'lucide-react';

const ProjectCard = ({
  width="380px",
  height="350px",
  ...props
}) => {

  return (
    <BaseCard width={width} height={height} {...props}>
      <header>
        <h2>Nom du projet</h2>
        <p>Développement de la nouvelle version de l'API REST avec authentification JWT</p>
      </header>
      <section>
        <div className={styles.progressInfos}>
          <span>Progression</span>
          <span>0%</span>
        </div>
        <div className={styles.progressBar}></div>
        <div>0/2 tâches terminées</div>
      </section>
      <footer>
        <div className={styles.team}>
          <Users height={16} fill="gray"></Users> Equipe (3)
        </div>
        <div className={styles.users}>
          <UserLabel color="orange"></UserLabel>
          <TagLabel color="orange">Propriétaire</TagLabel>
          <div className={styles.usersGroup}>
            <UserLabel withBorder={true} color="gray" firstname="Billy" lastname="Dupont"></UserLabel>
            <UserLabel withBorder={true} color="gray" firstname="Caroline" lastname="Vincent"></UserLabel>
          </div>
        </div>
      </footer>
    </BaseCard>
  );
};

export default memo(ProjectCard);