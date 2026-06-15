import styles from "./page.module.css";
import ButtonIA from "@/components/ButtonIA/ButtonIA";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ButtonIA></ButtonIA>
      </main>
    </div>
  );
}
