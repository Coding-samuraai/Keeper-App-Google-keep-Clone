import React, { useState } from "react";
import UUID from "react-uuid";

function NoteTaker(props) {
  let [title, setTitle] = useState("");
  let [content, setContent] = useState([]);
  let [takingNote, setTakingNote] = useState(false);

  function handleChange(e) {
    let text = e.target.value;
    let placeHolder = e.target.placeholder;

    if (placeHolder === "Title") setTitle(text);
    else setContent(text.split("\n"));
  }

  function handleClick() {
    if (title === "") title = "Untitled";

    props.addNoteFunction(title, content, UUID());
    setTitle("");
    setContent("");
    document.querySelector("textarea").value = "";
    setTakingNote(false);
  }

  function handleFocus() {
    setTakingNote(true);
  }

  return (
    <div className="note-taker">
      <input
        className="note-title"
        type="text"
        placeholder="Title"
        value={title}
        onChange={handleChange}
        onFocus={handleFocus}
      />
      {takingNote ? (
        <>
          <textarea
            className="note-content"
            type="text"
            placeholder="Take a Note..."
            onChange={handleChange}
          />
          <button onClick={handleClick}>
            <h1>Add</h1>
          </button>
        </>
      ) : null}
    </div>
  );
}

export default NoteTaker;
