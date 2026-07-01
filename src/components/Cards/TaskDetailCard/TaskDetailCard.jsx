"use client"

import { memo, useState } from 'react';
import styles from './TaskDetailCard.module.css';
import {BaseCard} from '@/components/Cards'
import {IconButton} from '@/components/Buttons'
import {UserComment, CreateUserComment} from '@/components/Parts'
import {CalendarIcon, ChevronUp, ChevronDown} from 'lucide-react';
import { StatusLabel,UserLabel, TagLabel } from '@/components/Labels';

const TaskDetailCard = ({
  minWidth="380px",
  minHeight="350px",
  
  task={
    id: "cmqf60fde0049ijekv2w9766v",
    title: "Nom de la tâche",
    description: "Description de la tâche",
    status: "IN_PROGRESS",
    priority: "HIGH",
    dueDate: "2024-01-30T00:00:00.000Z",
    createdAt: "2026-06-15T12:04:01.106Z",
    updatedAt: "2026-06-15T12:04:01.106Z",
    projectId: "cmqf60f5j000tijekkatb1j8u",
    creatorId: "cmqf60f4d0009ijek4s1ecg6r",

    project: {
          "id": "cmqf60f5j000tijekkatb1j8u",
          "name": "Plateforme de Formation",
          "description": "Système de gestion de cours en ligne avec vidéos, quiz et suivi des progrès."
    },
    assignees: [
          {
            "id": "cmqf60fdi004bijek1sgawg1t",
            "assignedAt": "2026-06-15T12:04:01.110Z",
            "taskId": "cmqf60fde0049ijekv2w9766v",
            "userId": "cmqf60enh0000ijekbaoghiy4",
            "user": {
              "id": "cmqf60enh0000ijekbaoghiy4",
              "name": "Alice Martin",
              "email": "alice@example.com"
            }
          },
          {
            "id": "cmqf60fdm004dijektbbomgju",
            "assignedAt": "2026-06-15T12:04:01.114Z",
            "taskId": "cmqf60fde0049ijekv2w9766v",
            "userId": "cmqf60f4d0009ijek4s1ecg6r",
            "user": {
              "id": "cmqf60f4d0009ijek4s1ecg6r",
              "name": "Jacques Durand",
              "email": "jacques@example.com"
            }
          }
        ],
    comments: [
          {
            "id": "cmqf60fdq004fijek4yglh2za",
            "content": "Lecteur vidéo en cours. Contrôles de base implémentés.",
            "createdAt": "2026-06-15T12:04:01.118Z",
            "updatedAt": "2026-06-15T12:04:01.118Z",
            "taskId": "cmqf60fde0049ijekv2w9766v",
            "authorId": "cmqf60f4d0009ijek4s1ecg6r",
            "author": {
              "id": "cmqf60f4d0009ijek4s1ecg6r",
              "name": "Jacques Durand",
              "email": "jacques@example.com"
            }
          }
        ],
  },
  owner={
    id: "cmqf60f4d0009ijek4s1ecg6r",
    email: "",
    name: "Jacques Durand"
  },
  ...props
}) => {

  const [showComments, setShowComments] = useState(false)

  function formatShortDate(date) {
      return new Intl.DateTimeFormat("fr-FR", {
          day: "numeric",
          month: "long"
      }).format(new Date(date));
  }

  return (
    <BaseCard {...props} minWidth={minWidth} minHeight={minHeight}>
      <div className={styles.container}>
        <header>
          <div>
            <h2>{task.title}</h2>
            <StatusLabel status={task.status}></StatusLabel>
            <p className={styles.description}>{task.description}</p>
          </div>
          <IconButton iconName="..."></IconButton>
        </header>
        <section>
          <div>
            <span>Échéance :&nbsp;</span>
            <CalendarIcon size={16}></CalendarIcon>
            {formatShortDate(task.dueDate)}
          </div>
          <div>
            <span>Assigné à :</span> 
            {task.assignees.map((member)=>
              <span key={member.id}>
                <UserLabel key={member.id} withBorder={true} color="gray" user={member.user}></UserLabel>
                <TagLabel color="gray">{member.user.name}</TagLabel>
              </span>
            )}
          </div>
        </section>
        <footer>
          <hr></hr>
          <div className={styles.commentsHeader}>
            <span>Commentaires ({task.comments.length})</span>
            {showComments === false && <ChevronUp className={styles.icon} size={24} onClick={(e)=>setShowComments(true)}></ChevronUp>}
            {showComments === true && <ChevronDown className={styles.icon} size={24} onClick={(e)=>setShowComments(false)}></ChevronDown>}
          </div>
          {showComments &&
          <div className={styles.commentsList}>
            {task.comments.map((comment) => (
              <UserComment key={comment.id} comment={comment}></UserComment>
            ))}
            <CreateUserComment owner={owner}></CreateUserComment>
          </div>
          }
        </footer>
      </div>
    </BaseCard>
  );
};

export default memo(TaskDetailCard);