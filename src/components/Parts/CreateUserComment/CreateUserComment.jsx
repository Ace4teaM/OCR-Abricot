"use client"

import { memo, useState } from 'react';
import styles from './CreateUserComment.module.css';
import {UserLabel} from '@/components/Labels'

const CreateUserComment = ({
  owner={
    id: "cmqf60f4d0009ijek4s1ecg6r",
    email: "",
    name: "Jacques Durand"
  },
  ...props
}) => {

  const [text, setText] = useState("")

  const formatDate = (value) => {

    let date = Number.NaN;

    if (value instanceof Date && !isNaN(value))
    {
        date = value;
    }
    else
    {
      const parsed = new Date(value);
      if (!Number.isNaN(parsed.getTime())) {
        date = parsed;
      }
    }

    if (!isNaN(date)) {
      return date.toLocaleString("fr-FR", {
        day: "numeric",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    return value;
  };

  return (
    <div
      className={styles.container}
      {...props}
    >
        <UserLabel withBorder={true} user={owner}></UserLabel>
        <div className={styles.content}>
          <input type='text' className={styles.comment} value={text} onChange={(e)=>setText(e.target.value)} placeholder='Ajouter un commentaire...'></input>
        </div>
    </div>
  );
};

export default memo(CreateUserComment);