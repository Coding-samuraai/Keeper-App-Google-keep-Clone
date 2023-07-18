import React, { useRef } from "react";
import Header from "./Header";
import NoteContainer from "./NoteContainer";

function App() {

  let noteContainerRef=useRef(null);

  function search(searchValue) {
    noteContainerRef.current(searchValue);
  }

  return (
    <>
      <Header searchFunction={search}/>
      <NoteContainer ref={noteContainerRef}/>
    </>
  );
}

export default App;
