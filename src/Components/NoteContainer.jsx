import React, { useState, forwardRef, useImperativeHandle } from "react";
import NoteMaker from "./NoteMaker";
import NoteTaker from "./NoteTaker";

function NoteContainer(props, ref) {
  let [notes, setNotes] = useState([]);

  let [searchString, setSearchString] = useState("");

  function addNote(titleText, contentText, key) {
    let currNote = {
      id: key,
      title: titleText,
      content: contentText,
    };

    setNotes((prevNotes) => {
      return [...prevNotes, currNote];
    });
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((currNote) => {
        return currNote.id !== id;
      });
    });
  }

  function updateNote(updatedTitle, updatedContent, noteId) {
    setNotes((prevNotes) => {
      return prevNotes.map((currNote) => {
        if (currNote.id === noteId) {
          currNote.title = updatedTitle;
          currNote.content = updatedContent;
        }
        return currNote;
      });
    });
  }

  useImperativeHandle(ref, () => {
    return function (searchValue) {
      setSearchString(searchValue);
    };
  });

  function isPresent(str, currNote) {
    return (
      currNote.content
        .reduce((accu, curr) => {
          return accu + curr;
        })
        .toLowerCase()
        .includes(str.toLowerCase()) |
      currNote.title.toLowerCase().includes(str.toLowerCase())
    );
  }

  return (
    <>
      <NoteTaker addNoteFunction={addNote} />
      <div className="note-container">
        {notes.map((currNote) => {
          if (searchString === "" || isPresent(searchString, currNote)) {
            return (
              <NoteMaker
                title={currNote.title}
                content={currNote.content}
                key={currNote.id}
                id={currNote.id}
                deleteNoteFunction={deleteNote}
                updateNoteFunction={updateNote}
              />
            );
          }
        })}
      </div>
    </>
  );
}

export default forwardRef(NoteContainer);
