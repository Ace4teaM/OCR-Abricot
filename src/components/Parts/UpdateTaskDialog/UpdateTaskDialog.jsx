"use client"

import { memo, useState, useEffect } from 'react';
import styles from './UpdateTaskDialog.module.css';
import {Button} from "@/components/Buttons";
import {TagLabel} from "@/components/Labels";
import {SelectInput} from "@/components/Inputs";
import { TASK_STATUS } from "@/constants/taskStatus";

const UpdateTaskDialog = ({
  setDialogResult,
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

  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)
  const [dueDate, setDueDate] = useState(task.dueDate.substring(0, 10))
  const [assignees, setAssignees] = useState(task.assignees)
  const [status, setStatus] = useState(task.status)

  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche la soumission du formulaire
    
    const formData = new FormData(e.target.form)
    const data = Object.fromEntries(formData.entries())

    console.log(data);
  };

  return (
    <div className={styles.content}>
      <h2>Modifier une tâche</h2>
      <form>
        <label>Titre</label>
        <input required type='text' value={title} onChange={(e) => setTitle(e.target.value)}></input>
        <label>Description</label>
        <input required type='text' value={description} onChange={(e) => setDescription(e.target.value)}></input>
        <label>Échéance</label>
        <input required type='date' value={dueDate} onChange={(e) => setDueDate(e.target.value)}></input>
        <label>Assigné à :</label>
        <SelectInput placeholder="Choisir un ou plusieurs collaborateurs"></SelectInput>
        <label>Statut :</label>
        <div className={styles.tags}>
          <TagLabel color={status == TASK_STATUS.TODO ? undefined : "gray"} onClick={(e)=>setStatus(TASK_STATUS.TODO)}>À faire</TagLabel>
          <TagLabel color={status == TASK_STATUS.IN_PROGRESS ? undefined : "gray"} onClick={(e)=>setStatus(TASK_STATUS.IN_PROGRESS)}>En cours</TagLabel>
          <TagLabel color={status == TASK_STATUS.DONE ? undefined : "gray"} onClick={(e)=>setStatus(TASK_STATUS.DONE)}>Terminée</TagLabel>
        </div>
      </form>
      <div className={styles.footer}>
        <Button onClick={(e)=>handleSubmit(e)}>Enregistrer</Button>
      </div>
    </div>
  );
};

export default memo(UpdateTaskDialog);