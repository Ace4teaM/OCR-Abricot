import styles from "./page.module.css";
import ButtonIA from "@/components/ButtonIA/ButtonIA";
import Chips from "@/components/Chips/Chips";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ButtonIA></ButtonIA>
        <Chips>Personnalisé</Chips>
        <Chips type="task">Mes tâches</Chips>
        <Chips type="kaban">Kaban</Chips>
        <Chips type="project">Mes projets</Chips>
      </main>
    </div>
  );
}
