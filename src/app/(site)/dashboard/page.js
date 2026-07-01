"use client"

import styles from "./page.module.css";
import {SearchInput} from "@/components/Inputs";
import {Button, ChipButton} from "@/components/Buttons";
import {TagLabel} from "@/components/Labels";
import {TaskCard} from "@/components/Cards";
import { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {useFetch} from "@/hooks/Http";
import { TASK_STATUS } from "@/constants/taskStatus";
import {CreateProjectDialog} from "@/components/Parts";
import {useApp} from "@/contexts/AppContext";

export default function Dashboard() {
  const { openDialog } = useApp();

  const { isLogged, userData } = useAuth()
  
  const [viewMode, setViewMode] = useState("list")

  /*
  {
  "success": true,
  "message": "Tâches assignées récupérées",
  "data": {
    "tasks": [
      {
        "id": "cmqf60fde0049ijekv2w9766v",
        "title": "Lecteur vidéo personnalisé",
        "description": "Développer un lecteur vidéo avec contrôles de progression et notes.",
        "status": "IN_PROGRESS",
        "priority": "HIGH",
        "dueDate": "2024-01-30T00:00:00.000Z",
        "createdAt": "2026-06-15T12:04:01.106Z",
        "updatedAt": "2026-06-15T12:04:01.106Z",
        "projectId": "cmqf60f5j000tijekkatb1j8u",
        "creatorId": "cmqf60f4d0009ijek4s1ecg6r",
        "project": {
          "id": "cmqf60f5j000tijekkatb1j8u",
          "name": "Plateforme de Formation",
          "description": "Système de gestion de cours en ligne avec vidéos, quiz et suivi des progrès."
        },
        "assignees": [
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
        "comments": [
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
        ]
      }
        ,...
    ]
  }
}
  */
  const assigned_tasks = useFetch("dashboard/assigned-tasks", process.env.NEXT_PUBLIC_USER_API_URL)
  
  const [searchValue, setSearchValue] = useState()
  
  const [assignedTasksData, setAssignedTasksData] = useState([])
  
  const filteredTasksData = useMemo(() => {
    const search = searchValue?.trim().toLowerCase();
    return assignedTasksData.filter(task => {
      return !search || task.title.toLowerCase().includes(search) || task.description.toLowerCase().includes(search) || task.project.name.toLowerCase().includes(search);
    });
  }, [assignedTasksData, searchValue]);

  const todoTasksData = useMemo(
      () => assignedTasksData.filter(task => task.status === TASK_STATUS.TODO),
      [assignedTasksData]
  );

  const inProgressTasksData = useMemo(
      () => assignedTasksData.filter(task => task.status === TASK_STATUS.IN_PROGRESS),
      [assignedTasksData]
  );

  const finishTasksData = useMemo(
      () => assignedTasksData.filter(task => task.status === TASK_STATUS.DONE),
      [assignedTasksData]
  );

  useEffect(()=>{
    if(assigned_tasks.hasData == false || assigned_tasks.data.length == 0)
      return

    setAssignedTasksData(assigned_tasks.data.data.tasks);

    console.log("assigned_tasks", assigned_tasks.data.data.tasks)
  }, [assigned_tasks.hasData])
  
  // Attent les informations sur l'utilisateur
  if (!isLogged || !assigned_tasks.hasData) {
      return null;
  }
  
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInfos}>
          <div>
            <h2>Tableau de bord</h2>
            <p>Bonjour {userData.name}, voici un aperçu de vos projets et tâches</p>
          </div>
          <div>
            <Button
                onClick={() =>
                  openDialog(CreateProjectDialog, {}, () => assigned_tasks.retry())
              }>+ Créer un projet</Button>
          </div>
        </div>
        <div className={styles.headerViewType}>
          <ChipButton type="task" onClick={(e)=>setViewMode("list")}>Liste</ChipButton>
          <ChipButton type="kaban" onClick={(e)=>setViewMode("kaban")}>Kaban</ChipButton>
        </div>
      </header>
      {viewMode == "list" ?
      <section className={styles.list}>
        <div className={styles.listSearch}>
          <div>
            <h3>Mes tâches assignées</h3>
            <p>Par ordre de priorité</p>
          </div>
          <SearchInput placeholder="Rechercher une tâche" setValue={setSearchValue} value={searchValue}></SearchInput>
        </div>
        <div className={styles.listContent}>
          {filteredTasksData.map((task)=>
            <TaskCard key={task.id} task={task} updateTaskSuccess={() => assigned_tasks.retry()}></TaskCard>
          )}
        </div>
      </section>
      :
      <section>
        <div className={styles.kabanColumns}>
          <div className={styles.columnContent}>
            <div className={styles.columnStatus}>A faire <TagLabel color="red">{todoTasksData.length}</TagLabel></div>
            {todoTasksData.map(task => (
                <TaskCard key={task.id} task={task} updateTaskSuccess={() => assigned_tasks.retry()} />
              ))
            }
          </div>
          <div className={styles.columnContent}>
            <div className={styles.columnStatus}>En cours <TagLabel color="orange">{inProgressTasksData.length}</TagLabel></div>
            {inProgressTasksData.map(task => (
                <TaskCard key={task.id} task={task} updateTaskSuccess={() => assigned_tasks.retry()} />
              ))
            }
          </div>
          <div className={styles.columnContent}>
            <div className={styles.columnStatus}>Terminées <TagLabel color="green">{finishTasksData.length}</TagLabel></div>
            {finishTasksData.map(task => (
                <TaskCard key={task.id} task={task} updateTaskSuccess={() => assigned_tasks.retry()} />
              ))
            }
          </div>
        </div>
      </section>
      }
    </div>
  );
}
