import "./UserComment.scss";
import React, { useState } from "react";
import { useGlobalContext } from "../context";
import { Comment } from "../context";
import DeleteIcon from "../assets/images/icon-delete.svg";
import EditIcon from "../assets/images/icon-edit.svg";
import ReplyIcon from "../assets/images/icon-reply.svg";
import PlusIcon from "../assets/images/icon-plus.svg";
import MinusIcon from "../assets/images/icon-minus.svg";
import CommentEditor from "./CommentEditor";

interface Props {
  userImage: string;
  replyingTo?: string;
}

type userFeedback = {
  agree: boolean;
  disagree: boolean;
  feedbackGiven: boolean;
};

const AGREE: string = "AGREE";
const DISAGREE: string = "DISAGREE";

const UserComment: React.FC<Props & Comment> = ({
  id,
  content,
  createdAt,
  score,
  user,
  userImage,
  replyingTo,
}): JSX.Element => {
  const [showEditBox, setShowEditBox] = useState<boolean>(false);
  const [showReplyEditor, setShowReplyEditor] = useState<boolean>(false);
  const [userFeedBack, setUserFeedback] = useState<userFeedback>({
    agree: false,
    disagree: false,
    feedbackGiven: false,
  });
  const { currentUser, comments, setComments, setShowModal, setCommentID } = useGlobalContext()!;

  const updateCommentScore = (feedbackType: string): void => {
    const updatedComments: Comment[] = comments.map((comment) => {
      if (comment.replies) {
        comment.replies = comment.replies.map((reply) => {
          if (reply.id === id) {
            feedbackType === AGREE ? reply.score++ : reply.score--;
          }
          return reply;
        });
      }
      if (comment.id === id) {
        feedbackType === AGREE ? comment.score++ : comment.score--;
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const handleUserFeedback = (feedbackType: string): void => {
    if (user.username === currentUser.username) return;

    if (feedbackType === AGREE && !userFeedBack.agree) {
      updateCommentScore(AGREE);
      if (!userFeedBack.feedbackGiven) {
        setUserFeedback({ agree: true, disagree: false, feedbackGiven: true });
      } else {
        setUserFeedback({ agree: false, disagree: false, feedbackGiven: false });
      }
    } else if (feedbackType === DISAGREE && !userFeedBack.disagree) {
      updateCommentScore(DISAGREE);
      if (!userFeedBack.feedbackGiven) {
        setUserFeedback({ agree: false, disagree: true, feedbackGiven: true });
      } else {
        setUserFeedback({ agree: false, disagree: false, feedbackGiven: false });
      }
    }
  };

  return (
    <>
      <div className="comment">
        {/*COMMENT HEADER*/}
        <header className="header">
          <img className="user-image" src={userImage} alt={`${user.username} image`} />

          <p className="user-name">{user.username}</p>
          {currentUser.username === user.username && <p className="current-user-label">you</p>}
          <p className="comment-date">{createdAt}</p>
        </header>

        {/*COMMENT CONTENT*/}
        {!showEditBox && (
          <div className="comment-content">
            {replyingTo !== undefined && <span className="replying-to">{`@${replyingTo} `}</span>}
            {content}
          </div>
        )}

        {showEditBox && (
          <CommentEditor
            edit
            setShowEditBox={setShowEditBox}
            currentCommentContent={content}
            userToReply={{ id, user, replyingTo }}
          />
        )}

        {/*COMMENT FOOTER*/}
        <footer className="footer">
          <div className="agree-and-disagree-button">
            <button onClick={() => handleUserFeedback(AGREE)} className="agree btn">
              <img className="agree-icon" src={PlusIcon} alt="agree icon" />
            </button>
            <span className="score"> {score}</span>
            <button onClick={() => handleUserFeedback(DISAGREE)} className="disagree btn">
              <img className="disagree-icon" src={MinusIcon} alt="disagree icon" />
            </button>
          </div>
          <div className="interaction-bar">
            {user.username === currentUser.username ? (
              <>
                <button
                  onClick={() => {
                    setCommentID(id);
                    setShowModal(true);
                  }}
                  className="delete btn"
                >
                  <img className="delete-icon" src={DeleteIcon} alt="delete icon" />
                  Delete
                </button>
                <button onClick={() => setShowEditBox(!showEditBox)} className="edit btn">
                  <img className="edit-icon" src={EditIcon} alt="edit icon" />
                  Edit
                </button>
              </>
            ) : (
              <button onClick={() => setShowReplyEditor(!showReplyEditor)} className="reply btn">
                <img className="reply-icon" src={ReplyIcon} alt="reply icon" />
                Replay
              </button>
            )}
          </div>
        </footer>
      </div>

      {showReplyEditor && (
        <CommentEditor
          reply
          userToReply={{ id, user, replyingTo }}
          setShowReplyEditor={setShowReplyEditor}
        />
      )}
    </>
  );
};
export default UserComment;
