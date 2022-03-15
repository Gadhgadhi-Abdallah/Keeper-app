import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteItems } from "../redux-store/itemSlice";

function Note({ note }) {
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();

  function doneClick() {
    setActive(!active);
  }

  return (
    <div className={active ? "note active" : "note"}>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
      <button
        onClick={() => {
          dispatch(deleteItems(note._id));
        }}
      >
        Delete
      </button>
      <button className="doneButton" onClick={doneClick}>
        Done
      </button>
    </div>
  );
}

export default Note;
