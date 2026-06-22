"use client"

import { useEffect, useState, useRef, useMemo, useId } from 'react';
import styles from './ModalDialog.module.css'
import {BaseCard} from "@/components/Cards";

const ModalDialog = ({
    children,
    ...props
}) => {
    
  const dialog_id = useId();

  const onClickClose = (e) => {
    const dlg = document.getElementById(dialog_id);
    dlg.close();
  }

  const isInDialogRef = useRef(false)

  const handleMouseUp = (e) => {
    if (isInDialogRef.current) {
      return
    }

    const dlg = document.getElementById(dialog_id);
    dlg.close();
  }

  const handleMouseDown = (e) => {
    const dlg = document.getElementById(dialog_id);
    const rect = dlg.getBoundingClientRect();

    const clickedInDialog =
      rect.top <= e.clientY &&
      e.clientY <= rect.bottom &&
      rect.left <= e.clientX &&
      e.clientX <= rect.right;

    isInDialogRef.current = clickedInDialog;
  }

  return (
    <dialog id={dialog_id} className={styles.container} onMouseUp={handleMouseUp} onMouseDown={handleMouseDown} {...props}>
      <BaseCard className={styles.content}>
         <span className={styles.closeBtn} onClick={onClickClose}>X</span>
         {children}
      </BaseCard>
    </dialog>
  )
}

export default ModalDialog;
