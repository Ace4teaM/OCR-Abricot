import styles from "./page.module.css";
import {Button} from "@/components/Buttons";
import Link from 'next/link'

export default function Account() {
  
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInfos}>
          <div>
            <h2>Mon compte</h2>
            <p>Amélie Dupont</p>
          </div>
        </div>
      </header>
      <section className={styles.list}>
        <form>
          <label>Nom</label>
          <input name="firstname" type="text"></input>
          <label>Prénom</label>
          <input name="lastname" type="text"></input>
          <label>Email</label>
          <input name="email" type="email"></input>
          <label>Mot de passe</label>
          <input name="password" type="password"></input>
        </form>
      </section>
      <footer className={styles.footer}>
        <Button>Modifier les informations</Button>
      </footer>
    </div>
  );
}
