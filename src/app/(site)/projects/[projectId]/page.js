import styles from "./page.module.css";
import {Button, IAButton, IconButton} from "@/components/Buttons";
import {UserLabel, TagLabel} from "@/components/Labels";
import Link from 'next/link'
import ProjectDetails from "./ProjectDetails";
import { cookies } from "next/headers";

export default async  function Project({ params }) {

  const { projectId } = await params;
  
  const cookieStore = await cookies();

/*

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
    "tasks": [
      {
        "id": "cmqf60f8e0021ijeki9tuk6p3",
        "title": "Tests automatisés",
        "description": "Écrire les tests unitaires et d'intégration pour l'API et l'interface.",
        "status": "TODO",
        "priority": "MEDIUM",
        "dueDate": "2024-03-10T00:00:00.000Z",
        "createdAt": "2026-06-15T12:04:00.927Z",
        "updatedAt": "2026-06-15T12:04:00.927Z",
        "projectId": "cmqf60f4i000bijekyhg10ezj",
        "creatorId": "cmqf60enh0000ijekbaoghiy4",
        "creator": {
          "id": "cmqf60enh0000ijekbaoghiy4",
          "email": "alice@example.com",
          "name": "Alice Martin"
        }
      },
    ],
    "_count": {
      "tasks": 5
    },
    "userRole": "ADMIN"
  },
*/
  let project;

  try {
    const response = await fetch(
      `${process.env.API_URL}/projects/${projectId}`,
      {
        cache: "no-store",
        headers: {
          Cookie: cookieStore.toString() /* transmet les cookies car ils contiennent le token d'authentification JWT */
        }
      }
    );

    if (response.status === 404) {
      notFound();
    }

    if (!response.ok) {
      throw new Error(`Erreur API ${response.status}`);
    }

    project = await response.json();

    project = project.data.project;

  } catch (error) {
    console.error(error);
    throw error;
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInfos}>
          <div>
            <IconButton className={styles.prevButton} iconName="<-"></IconButton>
            <div>
              <h2>Nom du projet</h2>
              <Link href="#">Modifier</Link>
            </div>
            <p>Développement de la nouvelle version de l'API REST avec authentification JWT</p>
          </div>
          <div>
            <Button>+ Créer un projet</Button>
            <IAButton></IAButton>
          </div>
        </div>
      </header>
      <section className={styles.contributors}>
        <div>
          <span className={styles.strong}>Contributeurs</span> 3 personnes
        </div>
        <div>
          <UserLabel color="orange" user={project.owner}></UserLabel>
          <TagLabel color="orange">Propriétaire</TagLabel>
          {project.members.map((member)=>
            <span key={member.id}>
              <UserLabel key={member.id} withBorder={true} color="gray" user={member.user}></UserLabel>
              <TagLabel color="gray">{member.user.name}</TagLabel>
            </span>
          )}
        </div>
      </section>
      <ProjectDetails project={project}></ProjectDetails>
    </div>
  );
}
