"use client"

import styles from "./page.module.css";
import {Button} from "@/components/Buttons";
import Image from 'next/image'
import Link from 'next/link'
import { useId } from "react";

export default function LogIn() {

  const email_id = useId();
  const password_id = useId();

  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche la soumission du formulaire
    
    const formData = new FormData(e.target.form)
    const data = Object.fromEntries(formData.entries())

    console.log(data);
  };

  return (
    <div className={styles.page}>
      <div className={styles.formContainer}>
        <Image src="/logo_orange.png" alt="logo" width={252} height={32}></Image>
        <form className={styles.form}>
          <h2>Connexion</h2>
          <label htmlFor={email_id}>Email</label>
          <input id={email_id} name="email" type="email"></input>
          <label htmlFor={password_id}>Mot de passe</label>
          <input id={password_id} name="password" type="password"></input>
          <Button className={styles.submit} onClick={(e)=>handleSubmit(e)}>Se connecter</Button>
          <div className={styles.lost}><Link href="/lost">Mot de passe oublié?</Link></div>
        </form>
        <div>Pas encore de compte ? <Link href="/signin">Créer un compte</Link></div>
      </div>
      <div className={styles.imageContainer}>
        <Image src="/login.png" alt="logo" sizes="(max-width: 768px) 0vw, 60vw" fill priority className={styles.image}></Image>
      </div>
    </div>
  );
}
