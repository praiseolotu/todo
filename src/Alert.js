import React, { useEffect } from "react";

const Alert = ({ type, message, removedAlert, listComp }) => {
  useEffect(() => {
    const time = setTimeout(() => {
      removedAlert();
    }, 3000);
    return () => {
      clearTimeout(time);
    };
  }, [listComp, removedAlert]);

  return (
    <>
      <p className={`alert alert-${type}`}>{message}</p>
    </>
  );
};

export default Alert;
