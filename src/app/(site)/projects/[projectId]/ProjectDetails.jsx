"use client"

import styles from "./ProjectDetails.module.css";
import {SearchInput, SelectInput} from "@/components/Inputs";
import {Button, ChipButton, IAButton, IconButton} from "@/components/Buttons";
import {UserLabel, TagLabel} from "@/components/Labels";
import {BaseCard, TaskDetailCard} from "@/components/Cards";
import {useFetch} from "@/hooks/Http";
import { useEffect, useState, useMemo } from "react";
import { TASK_STATUS, TASK_STATUS_LABELS } from "@/constants/taskStatus";

export default function ProjectDetails({ project }) {

  const [searchValue, setSearchValue] = useState()
  const [statusValue, setStatusValue] = useState()
  
  const [viewMode, setViewMode] = useState("list")

  const project_tasks = useFetch(`projects/${project.id}/tasks`, process.env.NEXT_PUBLIC_USER_API_URL)

  const [tasksData, setTasksData] = useState([])
  
  const filteredTasksData = useMemo(() => {
    const search = searchValue?.trim().toLowerCase();
    return tasksData.filter(task => {
      return (!search || task.title.toLowerCase().includes(search) || task.description.toLowerCase().includes(search) || task.project.name.toLowerCase().includes(search)) && (!statusValue || task.status === statusValue);
    });
  }, [tasksData, searchValue, statusValue]);

  useEffect(()=>{
    if(project_tasks.hasData == false || project_tasks.data.length == 0)
      return

    setTasksData(project_tasks.data.data.tasks);

    console.log("project_tasks", project_tasks.data.data.tasks)
  }, [project_tasks.hasData])
    
  return (
    <section>
      <BaseCard>
        <div className={styles.tasksHeader}>
            <div>
              <h3>Tâches</h3>
              <p>Par ordre de priorité</p>
            </div>
            <div>
              <ChipButton type="task" onClick={(e)=>setViewMode("list")}>Liste</ChipButton>
              <ChipButton type="kaban" onClick={(e)=>setViewMode("kaban")}>Calandrier</ChipButton>
            </div>
            <SelectInput placeholder="Statut" values={TASK_STATUS} labels={TASK_STATUS_LABELS} onChange={(val) => setStatusValue(val)}></SelectInput>
            <SearchInput placeholder="Rechercher une tâche" setValue={setSearchValue} value={searchValue}></SearchInput>
        </div>
        <div className={styles.tasksList}>
          {filteredTasksData.map((task)=>
            <TaskDetailCard key={task.id} task={task} owner={project.owner}></TaskDetailCard>
          )}
        </div>
      </BaseCard>
    </section>
  );
}
