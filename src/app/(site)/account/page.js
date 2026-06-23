"use client";

import styles from "./page.module.css";
import {Button} from "@/components/Buttons";
import { useEffect, useState, useRef } from "react";
import {useFetch} from "@/hooks/Http";

export default function Account() {
  const formRef = useRef();
  /*
    {
      "id": "string",
      "email": "user@example.com",
      "name": "string",
      "createdAt": "2026-06-23T11:53:12.390Z",
      "updatedAt": "2026-06-23T11:53:12.390Z"
    }
  */
  const profile = useFetch("auth/profile", process.env.NEXT_PUBLIC_USER_API_URL)

  const [email, setEmail] = useState("")
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [password, setPassword] = useState("")

  useEffect(()=>{
    if(profile.hasData == false || profile.data.length == 0)
      return

    const data = profile.data;

    console.log("data", data)

    if(profile.data.success)
    {
      const name = data.data.user.name.split(' ', 2)
      setFirstname(name[0] ?? "")
      setLastname(name[1] ?? "")
      setEmail(data.data.user.email)
    }
    else{
      /* gestion des erreurs */
    }
  }, [profile.hasData])

  useEffect(()=>{
    if(profile.error)
    {
      console.log("error", profile.error, profile.data)
      return
    }
  }, [profile.error])
  
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche la soumission du formulaire
    
    const formData = new FormData(formRef.current)
    const data = Object.fromEntries(formData.entries())

    /* todo envoie à l'API */

    console.log(data);
  };

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
        <form ref={formRef}>
          <label>Prénom</label>
          <input name="firstname" type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)}></input>
          <label>Nom</label>
          <input name="lastname" type="text" value={lastname} onChange={(e) => setLastname(e.target.value)}></input>
          <label>Email</label>
          <input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
          <label>Mot de passe</label>
          <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
        </form>
      </section>
      <footer className={styles.footer}>
        <Button onClick={(e)=>handleSubmit(e)}>Modifier les informations</Button>
      </footer>
    </div>
  );
}
