"use client"

import styles from "./page.module.css";
import {Button} from "@/components/Buttons";
import Image from 'next/image'
import Link from 'next/link'
import { useId } from "react";
import {Abricot} from "@/components/Icons";

export default function SingIn() {

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
        <Abricot width={252} height={32} color="#D3590B"></Abricot>
        <form className={styles.form}>
          <h2>Inscription</h2>
          <label htmlFor={email_id}>Email</label>
          <input id={email_id} name="email" type="email"></input>
          <label htmlFor={password_id}>Mot de passe</label>
          <input id={password_id} name="password" type="password"></input>
          <Button className={styles.submit} onClick={(e)=>handleSubmit(e)}>S'inscrire</Button>
        </form>
        <div>Déjà inscrit ? <Link href="/login">Se connecter</Link></div>
      </div>
      <div className={styles.imageContainer}>
        <Image src="/signin.jpg" alt="logo" sizes="(max-width: 768px) 0vw, 60vw" fill priority className={styles.image}></Image>
      </div>
    </div>
  );
}
