"use client"

import { memo, useState } from 'react';
import styles from './UserComment.module.css';
import Image from 'next/image'
import {UserLabel} from '@/components/Labels'

const UserComment = ({
  firstname = "Bertrand",
  lastname = "Dupond",
  date = "2026-06-17T11:20:00",
  comment = "Attention à bien gérer l'expiration des tokens et le refresh automatique côté client.",
  hasNew = false,
  ...props
}) => {

  const [text, setText] = useState(comment)

  const formatDate = (value) => {

    date = Number.NaN;

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
        <UserLabel withBorder={true} firstname = {firstname} lastname = {lastname}></UserLabel>
        {!hasNew ?
          <div className={styles.content}>
            <div className={styles.title}>{firstname} {lastname}</div>
            <div className={styles.comment}>{comment}</div>
            <div className={styles.date}>{formatDate(date)}</div>
          </div>
          :
          <div className={styles.content}>
            <input type='text' className={styles.comment} value={text} onChange={(e)=>setText(e.target.value)} placeholder='Ajouter un commentaire...'></input>
          </div>
        }
    </div>
  );
};

export default memo(UserComment);