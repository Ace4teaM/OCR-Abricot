import { memo } from 'react';
import styles from './BaseLabel.module.css';

const BaseLabel = ({
  className = "",
  children = "label",
  color = () => { /* string | func */
    switch(children){
      case "À faire":
        return "red";
      case "Terminée":
        return "green";
      case "En cours":
        return "yellow";
    }
    return "green";
  },
  ...props
}) => {

  const resolvedColor =
    typeof color === "function" ? color() : color;

  return (
    <span
      className={`${styles.container} ${className}`}
      data-color={resolvedColor}
      {...props}
    >{children}</span>
  );
};

export default memo(BaseLabel);