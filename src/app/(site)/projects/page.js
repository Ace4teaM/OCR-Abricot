"use client";

import styles from "./page.module.css";
import {Button} from "@/components/Buttons";
import {ProjectCard} from "@/components/Cards";
import { useEffect, useState } from "react";
import {useFetch} from "@/hooks/Http";
import {CreateProjectDialog} from "@/components/Parts";
import {useApp} from "@/contexts/AppContext";

export default function Projects() {
  const { openDialog } = useApp();

  /*
  {
  "success": true,
  "message": "Projets récupérés avec succès",
  "data": {
    "projects": [
      {
        "id": "cmqf60f5j000tijekkatb1j8u",
        "name": "Plateforme de Formation",
        "description": "Système de gestion de cours en ligne avec vidéos, quiz et suivi des progrès.",
        "createdAt": "2026-06-15T12:04:00.824Z",
        "updatedAt": "2026-06-15T12:04:00.824Z",
        "ownerId": "cmqf60f4d0009ijek4s1ecg6r",
        "owner": {
          "id": "cmqf60f4d0009ijek4s1ecg6r",
          "email": "jacques@example.com",
          "name": "Jacques Durand"
        },
        "members": [
          {
            "id": "cmqf60f5q000vijek76sq3r0j",
            "role": "CONTRIBUTOR",
            "joinedAt": "2026-06-15T12:04:00.831Z",
            "userId": "cmqf60enh0000ijekbaoghiy4",
            "projectId": "cmqf60f5j000tijekkatb1j8u",
            "user": {
              "id": "cmqf60enh0000ijekbaoghiy4",
              "email": "alice@example.com",
              "name": "Alice Martin"
            }
          }
        ],
        "_count": {
          "tasks": 3
        },
        "userRole": "CONTRIBUTOR"
      },
      ...
    ]
  }
}
  */
  const projects = useFetch("projects", process.env.NEXT_PUBLIC_USER_API_URL)

  useEffect(()=>{
    if(projects.hasData == false || projects.data.length == 0)
      return

    const data = projects;

    console.log("data", data)
  }, [projects.hasData])

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInfos}>
          <div>
            <h2>Mes projets</h2>
            <p>Gérez vos projets</p>
          </div>
          <div>
            <Button
                onClick={() =>
                  openDialog(CreateProjectDialog, {}, () => projects.retry())
                }>+ Créer un projet</Button>
          </div>
        </div>
      </header>
      <section>
        <div className={styles.grid}>
           {projects.hasData === true && projects.data.data.projects.map((project)=>
              <ProjectCard key={project.id} project={project}></ProjectCard>
           )}
        </div>
      </section>
    </div>
  );
}
