"use client"

import { memo, useState, useEffect } from 'react';
import styles from './UpdateTaskDialog.module.css';
import {Button} from "@/components/Buttons";
import {StatusLabel} from "@/components/Labels";
import {SearchUsersInput} from "@/components/Parts";
import { TASK_STATUS } from "@/constants/taskStatus";
import {usePut} from "@/hooks/Http";
import {ErrorMessage} from "@/components/Parts";

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

  const [status, setStatus] = useState(task.status)

/*
{
  "name": "Mon Projet",
  "description": "Description du projet",
  "contributors": [
    "user1@example.com",
    "user2@example.com"
  ]
}
*/
  const [ data, setData ] = useState(null)
  const update = usePut(`projects/${task.project.id}/tasks/${task.id}`, data, process.env.NEXT_PUBLIC_USER_API_URL)

  useEffect(()=>{
    if(update.hasData == false || update.data.length == 0)
      return

    console.log("update.data", update.data)

    if(update.data.success)
    {
      // déclenche la fermeture du dialogue
      setDialogResult(true);
    }
    else{
      /* gestion des erreurs */
    }
  }, [update.hasData])

  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche la soumission du formulaire
    
    const formData = new FormData(e.target.form)
    const data = Object.fromEntries(formData.entries())

    data.status = status

    data.assigneeIds = data.assigneeIds.trim()
    if(data.assigneeIds !== "")
      data.assigneeIds = data.assigneeIds.split(" ")

    setData(data);
    console.log(data);
  };

  return (
    <div className={styles.content}>
      <h2>Modifier une tâche</h2>
      <form>
        <label>Titre</label>
        <input required name="title" type='text' defaultValue={task.title}></input>
        <label>Description</label>
        <input required name="description" type='text' defaultValue={task.description}></input>
        <label>Échéance</label>
        <input required name="dueDate" type='date' defaultValue={task.dueDate.substring(0, 10)}></input>
        <label>Assigné à :</label>
        <SearchUsersInput name="assigneeIds" selectedPath="id" defaultSelection={task.assignees.map((e)=>e.user)} placeholder="Choisir un ou plusieurs collaborateurs"></SearchUsersInput>
        <label>Statut :</label>
        <div className={styles.tags}>
          <StatusLabel status={TASK_STATUS.TODO} color={status == TASK_STATUS.TODO ? undefined : "gray"} onClick={(e)=>setStatus(TASK_STATUS.TODO)}></StatusLabel>
          <StatusLabel status={TASK_STATUS.IN_PROGRESS} color={status == TASK_STATUS.IN_PROGRESS ? undefined : "gray"} onClick={(e)=>setStatus(TASK_STATUS.IN_PROGRESS)}></StatusLabel>
          <StatusLabel status={TASK_STATUS.DONE} color={status == TASK_STATUS.DONE ? undefined : "gray"} onClick={(e)=>setStatus(TASK_STATUS.DONE)}></StatusLabel>
        </div>
        <div className={styles.footer}>
          <Button onClick={(e)=>handleSubmit(e)}>Enregistrer</Button>
        </div>
      </form>
      <ErrorMessage active={update.error} data={update.data}></ErrorMessage>
    </div>
  );
};

export default memo(UpdateTaskDialog);