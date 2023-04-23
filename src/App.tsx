import "./App.scss";
import React from "react";
import CommentEditor from "./components/CommentEditor";
import { useGlobalContext } from "./context";
import { userImages } from "./context";
import UserComment from "./components/UserComment";
import Modal from "./components/Modal";

const App: React.FC = (): JSX.Element => {
  const { commentID, deleteComment, comments, showModal, setShowModal } = useGlobalContext()!;

  const renderedComments = comments.map((comment, idx) => {
    return (
      <div className="user-comment" key={`${idx}-${comment.user.username}-${comment.createdAt}`}>
        <UserComment
          id={comment.id}
          content={comment.content}
          createdAt={comment.createdAt}
          score={comment.score}
          user={comment.user}
          userImage={userImages[comment.user.username]}
          replies={comment.replies}
        />
        {comment.replies && (
          <div className="replies">
            {/*Comment Replies*/}
            {comment.replies.map((reply, idx) => {
              return (
                <UserComment
                  key={`${idx}-${reply.user.username}-${reply.createdAt}`}
                  userImage={userImages[reply.user.username]}
                  id={reply.id}
                  content={reply.content}
                  createdAt={reply.createdAt}
                  score={reply.score}
                  user={reply.user}
                  replyingTo={reply.replyingTo}
                  replies={comment.replies}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  });

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
        <div className="comments">{renderedComments}</div>
        <CommentEditor send />
      </div>
    </div>
  );
};

export default App;
