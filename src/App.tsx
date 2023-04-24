import "./App.scss";
import React from "react";
import CommentEditor from "./components/CommentEditor";
import { useGlobalContext } from "./context";
import Modal from "./components/Modal";
import CommentsList from "./components/CommentsList";

const App: React.FC = (): JSX.Element => {
  const { commentID, deleteComment, showModal, setShowModal } = useGlobalContext()!;

  return (
    <div className="app">
      {showModal && (
        <Modal
          subject={"Delete comment"}
          message={
            "Are you sure you want to delete this comment? This will remove the comment and can't be undone."
          }
          actionBtnText={"yes, delete"}
          actionBtnColor={"#ED6368"}
          actionBtnCallback={() => deleteComment(commentID)}
          actionBtnTextColor={"#fff"}
          closeModalBtnText={"no, cancel"}
          closeModalBtnColor={"#67727E"}
          closeModalBtnTextColor={"#fff"}
          setShowModal={setShowModal}
        />
      )}

      <div className="container">
        <CommentsList />
        <CommentEditor send />
      </div>
    </div>
  );
};

export default App;
