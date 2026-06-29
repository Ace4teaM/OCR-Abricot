"use client"

import styles from "./page.module.css";
import {Button} from "@/components/Buttons";
import {Abricot} from "@/components/Icons";
import {ErrorMessage} from "@/components/Parts";
import {usePost} from "@/hooks/Http";
import Image from 'next/image'
import Link from 'next/link'
import { useId, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogIn() {
  const router = useRouter();

  const email_id = useId();
  const password_id = useId();

  const [ data, setData ] = useState(null)
  const login = usePost("auth/login", data, process.env.NEXT_PUBLIC_USER_API_URL)

  useEffect(()=>{
    if(login.hasData == false || login.data.length == 0)
      return

    console.log("login.data", login.data.data.user)

    if(login.data.success)
    {
      router.push("/dashboard");
    }
    else{
      /* gestion des erreurs */
    }
  }, [login.hasData])

  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche la soumission du formulaire
    
    const formData = new FormData(e.target.form)
    const data = Object.fromEntries(formData.entries())

    console.log(data);

    setData(data);
  };

  return (
    <div className={styles.page}>
      <div className={styles.formContainer}>
        <Abricot width={252} height={32} color="#D3590B"></Abricot>
        <form className={styles.form}>
          <h2>Connexion</h2>
          <label htmlFor={email_id}>Email</label>
          <input id={email_id} name="email" type="email"></input>
          <label htmlFor={password_id}>Mot de passe</label>
          <input id={password_id} name="password" type="password"></input>
          <Button className={styles.submit} onClick={(e)=>handleSubmit(e)} disabled={login.isLoading == true}>Se connecter</Button>
          <div className={styles.lost}><Link href="/lost">Mot de passe oublié?</Link></div>
          <ErrorMessage active={login.error} data={login.data}></ErrorMessage>
        </form>
        <div>Pas encore de compte ? <Link href="/signin">Créer un compte</Link></div>
      </div>
      <div className={styles.imageContainer}>
        <Image src="/login.png" alt="logo" sizes="(max-width: 768px) 0vw, 60vw" fill priority className={styles.image}></Image>
      </div>
    </div>
  );
}
