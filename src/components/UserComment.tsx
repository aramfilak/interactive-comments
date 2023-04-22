import "./UserComment.scss";
import React, { useState } from "react";
import { useGlobalContext } from "../context";
import { Comment } from "../context";
import DeleteIcon from "../assets/images/icon-delete.svg";
import EditIcon from "../assets/images/icon-edit.svg";
import ReplyIcon from "../assets/images/icon-reply.svg";
import PlusIcon from "../assets/images/icon-plus.svg";
import MinusIcon from "../assets/images/icon-minus.svg";
import Modal from "./Modal";

interface Props {
  userImage: string;
  replyingTo?: string;
}

const UserComment: React.FC<Props & Comment> = ({
  id,
  content,
  createdAt,
  score,
  user,
  userImage,
  replyingTo,
}): JSX.Element => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { currentUser, comments, setComments } = useGlobalContext()!;
  const deleteComment = (): void => {
    const undeletedComments: Comment[] = comments.filter((comment) => {
      if (comment.id === id) {
        return false;
      }
      if (comment.replies) {
        comment.replies = comment.replies.filter((reply) => reply.id !== id);
      }
      return true;
    });
    setComments(undeletedComments);
  };
  const modalRoot = document.getElementById("modal-root");
  return (
    <div className="comment">
      <header className="header">
        <img
          className="user-image"
          src={userImage}
          alt={`${user.username} image`}
        />

        <p className="user-name">{user.username}</p>
        {currentUser.username === user.username && (
          <p className="current-user-label">you</p>
        )}
        <p className="comment-date">{createdAt}</p>
      </header>
      <div className="comment-content">
        {replyingTo !== undefined && (
          <span className="replying-to">{`@${replyingTo} `}</span>
        )}
        {content}
      </div>
      <footer className="footer">
        <div className="agree-and-disagree-button">
          <button className="agree btn">
            <img className="agree-icon" src={PlusIcon} alt="agree icon" />
          </button>
          <span className="score"> {score}</span>
          <button className="disagree btn">
            <img
              className="disagree-icon"
              src={MinusIcon}
              alt="disagree icon"
            />
          </button>
        </div>
        <div className="interaction-bar">
          {user.username === currentUser.username ? (
            <>
              <button onClick={() => setShowModal(true)} className="delete btn">
                <img
                  className="delete-icon"
                  src={DeleteIcon}
                  alt="delete icon"
                />
                Delete
              </button>
              <button className="edit btn">
                <img className="edit-icon" src={EditIcon} alt="edit icon" />
                Edit
              </button>
            </>
          ) : (
            <button className="reply btn">
              <img className="reply-icon" src={ReplyIcon} alt="reply icon" />
              Replay
            </button>
          )}
        </div>
      </footer>

      {showModal && (
        <Modal
          subject={"Delete comment"}
          message={
            "Are you sure you want to delete this comment? This will remove the comment and can't be undone."
          }
          actionBtnText={"yes, delete"}
          actionBtnColor={"#ED6368"}
          actionBtnCallback={deleteComment}
          actionBtnTextColor={"#fff"}
          closeModalBtnText={"no, cancel"}
          closeModalBtnColor={"#67727E"}
          closeModalBtnTextColor={"#fff"}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
};

export default UserComment;
