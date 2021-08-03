import React, { useState, useEffect } from "react";

import List from "./List";

import Alert from "./Alert";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  }
  return [];
};

function App() {
  // states

  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("functioning");
    if (!name) {
      showAlert(true, "No item entered", "danger");
    } else if (name && isEditing) {
      // do stuff here => edit
      setList(
        list.map((each) => {
          if (each.id === editId) {
            return { ...each, title: name };
          }
          return each;
        })
      );
      setName("");
      setIsEditing(false);
      setEditId(null);
      showAlert(true, "value changed", "success");
    } else {
      // show alert
      showAlert(true, "item added", "success");
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  // function to set alert

  const showAlert = (show = false, message, type) => {
    setAlert({ show, message, type });
  };

  // function to clear list

  const clearList = () => {
    showAlert(true, "list empty", "danger");
    setList([]);
  };

  // function to delete individual item

  const deleteItem = (id) => {
    showAlert(true, "item removed", "danger");
    const finder = list.filter((each) => each.id !== id);
    setList(finder);
  };

  // function to edit item

  const editItem = (id) => {
    const finder = list.find((each) => each.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(finder.title);
  };

  // setup local storage

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <>
      <section className="section-center">
        <form className="grocery-form" onSubmit={handleSubmit}>
          {alert.show && (
            <Alert {...alert} removedAlert={showAlert} listComp={list} />
          )}
          <h3>PJ Todo</h3>
          <div className="form-control">
            <input
              type="text"
              className="grocery"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g I will code today"
            />
            <button type="submit" className="submit-btn">
              {isEditing ? "edit" : "submit"}
            </button>
          </div>
        </form>

        {list.length > 0 && (
          <div className="grocery-container">
            <List items={list} removeItem={deleteItem} editItem={editItem} />
            <button type="button" className="clear-btn" onClick={clearList}>
              clear items
            </button>
          </div>
        )}
      </section>
    </>
  );
}

export default App;
