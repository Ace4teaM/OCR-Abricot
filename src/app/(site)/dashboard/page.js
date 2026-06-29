"use client"

import styles from "./page.module.css";
import {SearchInput} from "@/components/Inputs";
import {Button, ChipButton} from "@/components/Buttons";
import {TagLabel} from "@/components/Labels";
import {TaskCard} from "@/components/Cards";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function Dashboard() {
  const { isLogged, userData } = useAuth()
  
  const [viewMode, setViewMode] = useState("list")

  // Attent les informations sur l'utilisateur
  if (!isLogged) {
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
            <Button>+ Créer un projet</Button>
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
          <SearchInput placeholder="Rechercher une tâche"></SearchInput>
        </div>
        <div className={styles.listContent}>
          <TaskCard></TaskCard>
          <TaskCard></TaskCard>
          <TaskCard></TaskCard>
          <TaskCard></TaskCard>
          <TaskCard></TaskCard>
          <TaskCard></TaskCard>
        </div>
      </section>
      :
      <section>
        <div className={styles.kabanColumns}>
          <div className={styles.columnContent}>
            <div className={styles.columnStatus}>A faire <TagLabel>4</TagLabel></div>
            <TaskCard></TaskCard>
            <TaskCard></TaskCard>
            <TaskCard></TaskCard>
            <TaskCard></TaskCard>
          </div>
          <div className={styles.columnContent}>
            <div className={styles.columnStatus}>En cours <TagLabel>4</TagLabel></div>
            <TaskCard></TaskCard>
            <TaskCard></TaskCard>
            <TaskCard></TaskCard>
            <TaskCard></TaskCard>
          </div>
          <div className={styles.columnContent}>
            <div className={styles.columnStatus}>Terminées <TagLabel>4</TagLabel></div>
            <TaskCard></TaskCard>
            <TaskCard></TaskCard>
            <TaskCard></TaskCard>
            <TaskCard></TaskCard>
          </div>
        </div>
      </section>
      }
    </div>
  );
}
