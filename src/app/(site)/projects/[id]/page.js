import styles from "./page.module.css";
import {Button, IAButton, IconButton} from "@/components/Buttons";
import {UserLabel, TagLabel} from "@/components/Labels";
import Link from 'next/link'
import ProjectDetails from "./ProjectDetails";

export default async  function Project({ params }) {

  const { slug } = await params;

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
          <UserLabel color="orange"></UserLabel>
          <TagLabel color="orange">Propriétaire</TagLabel>
          <UserLabel color="gray"></UserLabel>
          <TagLabel color="gray">Nom Prénom</TagLabel>
          <UserLabel color="gray"></UserLabel>
          <TagLabel color="gray">Nom Prénom</TagLabel>
        </div>
      </section>
      <ProjectDetails slug={slug}></ProjectDetails>
    </div>
  );
}
