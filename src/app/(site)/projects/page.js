import styles from "./page.module.css";
import {Button} from "@/components/Buttons";
import {ProjectCard} from "@/components/Cards";

export default function Projects() {
  
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInfos}>
          <div>
            <h2>Mes projets</h2>
            <p>Gérez vos projets</p>
          </div>
          <div>
            <Button>+ Créer un projet</Button>
          </div>
        </div>
      </header>
      <section>
        <div className={styles.grid}>
          <ProjectCard></ProjectCard>
          <ProjectCard></ProjectCard>
          <ProjectCard></ProjectCard>
          <ProjectCard></ProjectCard>
          <ProjectCard></ProjectCard>
          <ProjectCard></ProjectCard>
          <ProjectCard></ProjectCard>
          <ProjectCard></ProjectCard>
          <ProjectCard></ProjectCard>
        </div>
      </section>
    </div>
  );
}
