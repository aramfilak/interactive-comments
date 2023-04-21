import "./CommentEditor.scss";
import React, { useState } from "react";
import { useGlobalContext } from "../context";
import comment from "./Comment";
import { Comment } from "../context";

interface Props {
  userImage: string;
}

const CommentEditor: React.FC<Props> = ({ userImage }) => {
  const [comment, setComment] = useState<string>("");
  const { currentUser, comments, setComments } = useGlobalContext()!;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();

    const userComment: Comment = {
      id: comments.length + 1,
      content: comment,
      createdAt: "now",
      score: 0,
      user: {
        image: {
          png: "./images/avatars/image-maxblagun.png",
          webp: "./images/avatars/image-maxblagun.webp",
        },
        username: currentUser.username,
      },
      replies: [],
    };
    setComments([...comments, userComment]);
    setComment("");
    console.log(comments);
  };
  return (
    <div className="comment-editor">
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Add a comment..."
          onChange={handleChange}
          className="text-box"
          value={comment}
        ></textarea>
        <footer className="footer">
          <img className="user-image" src={userImage} alt="your image" />
          <button className="submit-btn">send</button>
        </footer>
      </form>
    </div>
  );
};

export default CommentEditor;
