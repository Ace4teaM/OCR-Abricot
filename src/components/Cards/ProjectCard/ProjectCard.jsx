import { memo } from 'react';
import styles from './ProjectCard.module.css';
import {BaseCard} from '@/components/Cards'
import {TagLabel, UserLabel} from '@/components/Labels'
import {Users} from 'lucide-react';

const ProjectCard = ({
  project={
    id: "cmqf60f5j000tijekkatb1j8u",
    name: "Plateforme de Formation",
    description: "Système de gestion de cours en ligne avec vidéos, quiz et suivi des progrès.",
    createdAt: "2026-06-15T12:04:00.824Z",
    updatedAt: "2026-06-15T12:04:00.824Z",
    ownerId: "cmqf60f4d0009ijek4s1ecg6r",
    owner: {
      id: "cmqf60f4d0009ijek4s1ecg6r",
      email: "jacques@example.com",
      name: "Jacques Durand"
    },
    members: [
      {
        id: "cmqf60f5q000vijek76sq3r0j",
        role: "CONTRIBUTOR",
        joinedAt: "2026-06-15T12:04:00.831Z",
        userId: "cmqf60enh0000ijekbaoghiy4",
        projectId: "cmqf60f5j000tijekkatb1j8u",
        user: {
          id: "cmqf60enh0000ijekbaoghiy4",
          email: "alice@example.com",
          name: "Alice Martin"
        }
      }
    ],
  },
  ...props
}) => {

  console.log("ProjectCard Members", project.name, project.members, project.owner);

  return (
    <BaseCard {...props}>
      <header>
        <h2>{project.name}</h2>
        <p>{project.description}</p>
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
          <Users height={16} fill="gray"></Users> Equipe ({project.members.length + 1})
        </div>
        <div className={styles.users}>
          <UserLabel color="orange" user={project.owner}></UserLabel>
          <TagLabel color="orange">Propriétaire</TagLabel>
          <div className={styles.usersGroup}>
            {project.members.map((member)=>
              <UserLabel key={member.id} withBorder={true} color="gray" user={member.user}></UserLabel>
            )}
          </div>
        </div>
      </footer>
    </BaseCard>
  );
};

export default memo(ProjectCard);