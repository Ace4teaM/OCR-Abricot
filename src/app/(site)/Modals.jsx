"use client"

import styles from "./Modals.module.css";
import { useRef } from "react";
import {CreateTaskDialog, CreateTaskDialogIA, UpdateTaskDialog, CreateProjectDialog, UpdateProjectDialog} from "@/components/Parts";
import {Button, IAButton} from "@/components/Buttons";

export default function Modals({ slug }) {

  const dialogRef = useRef(null);
  const dialogRef2 = useRef(null);
  const dialogRef3 = useRef(null);
  const dialogRef4 = useRef(null);
  const dialogRef5 = useRef(null);

  const Show = (ref) =>{
    var dialog = ref.current;
    dialog.showModal();
  }

  return (
    <>
      <Button onClick={(e)=>Show(dialogRef)}>Create Task</Button>
      <CreateTaskDialog ref={dialogRef}></CreateTaskDialog>
      <Button onClick={(e)=>Show(dialogRef3)}>Update Task</Button>
      <UpdateTaskDialog ref={dialogRef3}></UpdateTaskDialog>
      <Button onClick={(e)=>Show(dialogRef4)}>Create Project</Button>
      <CreateProjectDialog ref={dialogRef4}></CreateProjectDialog>
      <Button onClick={(e)=>Show(dialogRef5)}>Update Project</Button>
      <UpdateProjectDialog ref={dialogRef5}></UpdateProjectDialog>
      <IAButton onClick={(e)=>Show(dialogRef2)}></IAButton>
      <CreateTaskDialogIA ref={dialogRef2}></CreateTaskDialogIA>
    </>
  );
}
