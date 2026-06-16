import styles from "./page.module.css";
import {IAButton, ChipButton} from "@/components/Buttons";
import {TagLabel} from "@/components/Labels";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <IAButton></IAButton>
        <ChipButton>Personnalisé</ChipButton>
        <ChipButton type="task">Mes tâches</ChipButton>
        <ChipButton type="kaban">Kaban</ChipButton>
        <ChipButton type="project">Mes projets</ChipButton>
        <TagLabel color="green"></TagLabel>
        <TagLabel color="orange"></TagLabel>
        <TagLabel color="red"></TagLabel>
        <TagLabel color="yellow"></TagLabel>
        <TagLabel color="blue"></TagLabel>
        <TagLabel color="gray"></TagLabel>
      </main>
    </div>
  );
}
