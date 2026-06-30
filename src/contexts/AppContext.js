import { createContext, useContext, useEffect, useState, useRef } from "react";
import {ModalDialog} from "@/components/Containers";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [dialog, setDialog] = useState(null);
  const dialogRef = useRef(null);

  function openDialog(Component, props = {}, success = () => {}, resolve = (result) => {}) {
      setDialog({
          Component,
          props,
          success,
          resolve
      });
  }

  function closeDialog(result) {
    if(result === true)
      dialog.success()
    dialog.resolve(result)
    setDialog(null);
  }

  useEffect(()=>{
    if(dialog === null)
      return;
    
    var dialogInst = dialogRef.current;
    dialogInst.showModal();

  },[dialog])

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        openDialog,
        closeDialog
      }}
    >
      {children}
      {dialog && (
      <ModalDialog ref={dialogRef} closeDialog={closeDialog} Component={dialog.Component} ComponentProps={dialog.props}>
      </ModalDialog>
      )}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}