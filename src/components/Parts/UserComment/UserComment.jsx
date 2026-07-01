"use client"

import { memo, useState } from 'react';
import styles from './UserComment.module.css';
import {UserLabel} from '@/components/Labels'

const UserComment = ({
  comment={
    id: "cmqf60f6r0019ijekoy59ribo",
    content: "Base de données créée avec succès. Toutes les tables sont en place et les relations sont correctes.",
    createdAt: "2026-06-15T12:04:00.868Z",
    updatedAt: "2026-06-15T12:04:00.868Z",
    taskId: "cmqf60f6c0013ijekptzaydq6",
    authorId: "cmqf60era0002ijek65kc2x07",
    author: {
      id: "cmqf60era0002ijek65kc2x07",
      email: "caroline@example.com",
      name: "Caroline Leroy"
    },
    task: {
      id: "cmqf60f6c0013ijekptzaydq6",
      title: "Conception de la base de données"
    }
  },
  ...props
}) => {

  const [text, setText] = useState(comment.content)

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
        <UserLabel withBorder={true} user={comment.author}></UserLabel>
        <div className={styles.content}>
          <div className={styles.title}>{comment.author.name}</div>
          <div className={styles.comment}>{comment.content}</div>
          <div className={styles.date}>{formatDate(comment.updatedAt)}</div>
        </div>
    </div>
  );
};

export default memo(UserComment);