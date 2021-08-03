import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
const List = ({ items, removeItem, editItem }) => {
  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pM" : "aM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }
  return (
    <>
      <div className="grocery-list">
        {items.map((item) => {
          const { id, title } = item;
          return (
            <>
              <article className="grocery-item" key={id}>
                <p className="title">{title}</p>

                <p className="title">{formatAMPM(new Date())}</p>
                <div className="btn-container">
                  <button
                    type="button"
                    className="edit-btn"
                    onClick={() => editItem(id)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => removeItem(id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </article>
            </>
          );
        })}
      </div>
    </>
  );
};

export default List;
