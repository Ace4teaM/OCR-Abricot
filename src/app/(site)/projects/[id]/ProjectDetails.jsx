"use client"

import styles from "./ProjectDetails.module.css";
import {SearchInput, SelectInput} from "@/components/Inputs";
import {Button, ChipButton, IAButton, IconButton} from "@/components/Buttons";
import {UserLabel, TagLabel} from "@/components/Labels";
import {BaseCard, TaskCard} from "@/components/Cards";
import Link from 'next/link'
import { useId, useState } from "react";

export default function ProjectDetails({ slug }) {

  const [viewMode, setViewMode] = useState("list")

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
            <SelectInput placeholder="Statut"></SelectInput>
            <SearchInput placeholder="Rechercher une tâche"></SearchInput>
        </div>
        <div className={styles.tasksList}>
            <TaskCard></TaskCard>
            <TaskCard></TaskCard>
            <TaskCard></TaskCard>
            <TaskCard></TaskCard>
        </div>
      </BaseCard>
    </section>
  );
}
