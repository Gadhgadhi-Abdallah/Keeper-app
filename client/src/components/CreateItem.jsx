import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postItems } from "../redux-store/itemSlice";

function CreateItem(props) {
  const [note, setNote] = useState({ title: "", content: "" });
  const dispatch = useDispatch();

  function handelSubmit(event) {
    event.preventDefault();
    dispatch(postItems(note));
    setNote({ title: "", content: "" });
  }

  return (
    <div className="createNoteContainer">
      <form className="create-note">
        <input name="title" onChange={(e) => setNote({ ...note, title: e.target.value })} value={note.title} placeholder="Title" />
        <textarea
          name="content"
          onChange={(e) => setNote({ ...note, content: e.target.value })}
          value={note.content}
          placeholder="Take a note..."
          rows="3"
        />
        <button onClick={handelSubmit}>Add</button>
      </form>
    </div>
  );
}

export default CreateItem;
