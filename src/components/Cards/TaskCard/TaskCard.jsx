"use client"

import { memo } from 'react';
import styles from './TaskCard.module.css';
import {BaseCard} from '@/components/Cards'
import {StatusLabel} from '@/components/Labels'
import {Button} from '@/components/Buttons'
import {FolderOpen, CalendarDays, MessageSquareText} from 'lucide-react';
import {UpdateTaskDialog} from "@/components/Parts";
import {useApp} from "@/contexts/AppContext";

const TaskCard = ({
  minWidth="380px",
  minHeight="350px",
  
  updateTaskSuccess = () => {},

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

  ...props
}) => {
  const { openDialog } = useApp();

  function formatShortDate(date) {
      return new Intl.DateTimeFormat("fr-FR", {
          day: "numeric",
          month: "long"
      }).format(new Date(date));
  }

  function formatLongDate(date) {
      return new Intl.DateTimeFormat("fr-FR", {
          dateStyle: "long",
          timeStyle: "short"
      }).format(new Date(date));
  }


  return (
    <BaseCard {...props} minWidth={minWidth} minHeight={minHeight}>
      <div className={styles.container}>
        <header>
          <h2>{task.title}</h2>
          <p className={styles.description}>{task.description}</p>
          <StatusLabel className={styles.tag} status={task.status}></StatusLabel>
        </header>
        <section>
          <FolderOpen></FolderOpen> {task.project.name} | <CalendarDays></CalendarDays> <span title={formatLongDate(task.updatedAt)}>{formatShortDate(task.updatedAt)}</span> | <MessageSquareText></MessageSquareText> {task.comments.length}
        </section>
        <footer>
          <Button className={styles.button}
           onClick={() =>
              openDialog(UpdateTaskDialog, {
                  task: task
              }, updateTaskSuccess)
          }>Voir</Button>
        </footer>
      </div>
    </BaseCard>
  );
};

export default memo(TaskCard);