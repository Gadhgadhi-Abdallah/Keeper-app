import React from "react";
import { useDispatch } from "react-redux";
import { deleteItems, updateItems } from "../redux-store/itemSlice";

function Note({ note }) {
  const dispatch = useDispatch();

  return (
    <div className={note.isDone ? "note active" : "note"}>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
      <button
        onClick={() => {
          dispatch(deleteItems(note._id));
        }}
      >
        Delete
      </button>
      <button className="doneButton" onClick={() => dispatch(updateItems({ ...note, isDone: !note.isDone }))}>
        Done
      </button>
    </div>
  );
}

export default Note;
