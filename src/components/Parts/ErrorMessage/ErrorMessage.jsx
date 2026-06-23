import { memo } from 'react';
import styles from './ErrorMessage.module.css';

const ErrorMessage = ({
  active = true,
  data = "Message de l'erreur",
  ...props
}) => {

  const message = typeof(data) === "string" ? data
                    : data.message ? data.message
                    : data instanceof Response && data.status != 200 ? `Un problème est survenu avec le serveur. ${data.message}`
                   : "";

  console.log("message", data)

  return (
    <div
      className={`${styles.container} ${active ? styles.enable : ''}`}
      {...props}
    >{message}</div>
  );
};

export default memo(ErrorMessage);