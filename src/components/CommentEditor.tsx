import "./CommentEditor.scss";
import React, { useState } from "react";
import { useGlobalContext } from "../context";
import { User, Comment, Reply } from "../context";

type userToReply = {
  id: number;
  user: User;
  replyingTo?: string;
};

interface Props {
  currentUserImage: string;
  userToReply?: userToReply;
  reply?: boolean;
  send?: boolean;
  setShowCommentEditor: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentEditor: React.FC<Props> = ({
  currentUserImage,
  userToReply,
  reply,
  send,
  setShowCommentEditor,
}) => {
  const [commentContent, setCommentContent] = useState<string>(
    send ? "" : `@${userToReply?.user.username} `
  );

  const { currentUser, comments, setComments } = useGlobalContext()!;

  if (reply !== undefined && send !== undefined) {
    throw Error('Please provide only one of "update" or "send" props');
  }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentContent(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();

    if (reply) {
      const currentUserReply: Reply = {
        id: Math.random() * 9999,
        content: commentContent.replace(`@${userToReply?.user.username!}`, ""),
        createdAt: "now",
        score: 0,
        replyingTo: userToReply?.user.username!,
        user: {
          image: {
            png: currentUser.image.png,
            webp: currentUser.image.webp,
          },
          username: currentUser.username,
        },
      };

      const updatedComments: Comment[] = comments.map((comment) => {
        if (comment.replies) {
          comment.replies.map((reply) => {
            if (reply.id === userToReply?.id!) {
              comment.replies = [...comment.replies, currentUserReply];
            }
          });
        }
        if (comment.id === userToReply?.id!) {
          comment.replies = [...comment.replies, currentUserReply];
        }
        return comment;
      });

      setComments(updatedComments);
      setShowCommentEditor(false);
    }

    if (send) {
      const userComment: Comment = {
        id: Math.random() * 9999,
        content: commentContent,
        createdAt: "now",
        score: 0,
        user: {
          image: {
            png: currentUser.image.png,
            webp: currentUser.image.webp,
          },
          username: currentUser.username,
        },
        replies: [],
      };
      setComments([...comments, userComment]);
    }
    setCommentContent("");

    console.log(comments);
  };

  return (
    <div className="comment-editor">
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder={send ? "Add a comment..." : ""}
          onChange={handleChange}
          className="text-box"
          value={commentContent}
        ></textarea>
        <footer className="footer">
          <img className="user-image" src={currentUserImage} alt="your image" />
          <button className="submit-btn">{send ? "send" : "reply"}</button>
        </footer>
      </form>
    </div>
  );
};

export default CommentEditor;
