import "./CommentEditor.scss";
import React, { useState } from "react";
import { useGlobalContext } from "../context";
import comment from "./UserComment";
import { Comment } from "../context";

interface Props {
  userImage: string;
  userToReply?: string;
  reply?: boolean;
  send?: boolean;
}

const CommentEditor: React.FC<Props> = ({
  userImage,
  userToReply,
  reply,
  send,
}) => {
  const [comment, setComment] = useState<string>(
    send ? "" : `@${userToReply} `
  );
  const { currentUser, comments, setComments } = useGlobalContext()!;

  if (reply !== undefined && send !== undefined) {
    throw Error('Please provide only one of "update" or "send" props');
  }

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
  };
  return (
    <div className="comment-editor">
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder={send ? "Add a comment..." : ""}
          onChange={handleChange}
          className="text-box"
          value={comment}
        ></textarea>
        <footer className="footer">
          <img className="user-image" src={userImage} alt="your image" />
          <button className="submit-btn">{send ? "send" : "reply"}</button>
        </footer>
      </form>
    </div>
  );
};

export default CommentEditor;
