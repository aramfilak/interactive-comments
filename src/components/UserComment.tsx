import "./UserComment.scss";
import React from "react";
import context, { useGlobalContext } from "../context";
import { Comment } from "../context";

interface Props {
  userImage: string;
}
const UserComment: React.FC<Props & Comment> = ({
  id,
  content,
  createdAt,
  score,
  user,
  userImage,
}): JSX.Element => {
  const { currentUser } = useGlobalContext()!;
  return (
    <div className="comment">
      <header>
        <img src={userImage} alt={`${user.username} image`} />
        <p className="date"></p>
      </header>
      <div className="comment-content">{content}</div>
      <footer>
        <div className="agree-and-disagree-button">
          <button className="agree">+</button>
          <button className="disagree">-</button>
        </div>
        <div className="interaction-bar">
          {user.username === currentUser.username ? (
            <>
              <button className="delete-btn">Delete</button>
              <button className="edit-btn">Edit</button>
            </>
          ) : (
            <button className="reply-btn">Replay</button>
          )}
        </div>
      </footer>
    </div>
  );
};

export default UserComment;
