import React, { useState } from "react";

function NoteMaker(props) {
  let [updateNote, setUpdateNote] = useState(false);
  let [updatedTitle, setUpdatedTitle] = useState(props.title);
  let [updatedContent, setUpdatedContent] = useState(props.content);

  function deleteNote() {
    props.deleteNoteFunction(props.id);
  }

  function update(event) {
    let tag = event.target.tagName;

    if (tag === "H1" || tag === "P") {
      if (!updateNote) {
        let noteElement = event.target.parentElement.parentElement;
        let noteDetails = noteElement.getBoundingClientRect();
        noteElement.style.top = noteDetails.top + "px";
        noteElement.style.left = noteDetails.left + "px";
        setUpdateNote(true);
      }
    } else {
      setUpdateNote(false);
      props.updateNoteFunction(updatedTitle, updatedContent, props.id);
    }
  }

  function handleChange(event) {
    let tag = event.target.tagName;
    let update = event.target.innerText;

    if (tag === "H1") setUpdatedTitle(update);
    else setUpdatedContent(update.split("\n"));
  }

  return (
    <div className={updateNote ? "updater-background" : null} onClick={update}>
      <div className={updateNote ? "note edit-note-animaton" : "note"}>
        <div
          className={
            updateNote ? "note-fields edit-note-fields" : "note-fields"
          }
          onInput={handleChange}
        >
          <h1
            contentEditable={updateNote}
            suppressContentEditableWarning={true}
          >
            {props.title}
          </h1>
          <p
            contentEditable={updateNote}
            suppressContentEditableWarning={true}
            style={updateNote ? { overflow: "scroll" } : null}
            dangerouslySetInnerHTML={{ __html: props.content.join("<br/>") }}
          ></p>
        </div>
        <div
          className={
            updateNote ? "note-buttons edit-note-buttons" : "note-buttons"
          }
        >
          <button onClick={deleteNote}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default NoteMaker;
