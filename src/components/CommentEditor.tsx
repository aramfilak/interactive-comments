import "./CommentEditor.scss";
import React, { useState } from "react";
import { useGlobalContext, userImages } from "../context";
import { User, Reply, Comment } from "../comment";

interface userToReply {
  id: number;
  user?: User;
  replyingTo?: string;
  createdAt?: string;
}

interface Props {
  userToReply?: userToReply;
  reply?: boolean;
  send?: boolean;
  edit?: boolean;
  currentCommentContent?: string;
  setShowReplyEditor?: React.Dispatch<React.SetStateAction<boolean>>;
  setShowEditBox?: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentEditor: React.FC<Props> = ({
  userToReply,
  reply,
  send,
  edit,
  setShowReplyEditor,
  currentCommentContent,
  setShowEditBox,
}) => {
  const [commentContent, setCommentContent] = useState<string>(
    send
      ? ""
      : reply
      ? `@${userToReply?.user?.username} `
      : `${userToReply?.replyingTo! ? "@" : ""}${
          userToReply?.replyingTo! || ""
        } ${currentCommentContent}`
  );

  const { currentUser, comments, setComments } = useGlobalContext()!;

  if ([reply, send, edit].filter(Boolean).length !== 1) {
    throw new Error('Please provide only one of "reply", "send", or "edit" props');
  }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentContent(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();

    if (edit) {
      const content: string = commentContent.replace(`@${userToReply?.replyingTo}`, "");
      const updatedComments: Comment[] = comments.map((comment) => {
        if (comment.replies) {
          comment.replies.map((reply) => {
            if (reply.id === userToReply?.id!) {
              reply.content = content;
            }
            return reply;
          });
        }
        if (comment.id === userToReply?.id!) {
          comment.content = content;
        }
        return comment;
      });

      setComments(updatedComments);
      setShowEditBox?.(false);
    }
    if (reply) {
      const content: string = commentContent.replace(`@${userToReply?.user?.username}`, "");
      const currentUserReply: Reply = {
        id: Math.random() * 9999,
        content: content,
        createdAt: "now",
        score: 0,
        replyingTo: userToReply?.user?.username!,
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
      setShowReplyEditor?.(false);
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
  };

  return (
    <div className={!edit ? "comment-editor" : "comment-editor edit"}>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder={send ? "Add a comment..." : ""}
          onChange={handleChange}
          className="text-box"
          value={commentContent}
        ></textarea>
        <footer className="footer">
          {!edit && (
            <img className="user-image" src={userImages[currentUser.username]} alt="your image" />
          )}

          <button className="submit-btn">{send ? "send" : reply ? "reply" : "update"}</button>
        </footer>
      </form>
    </div>
  );
};
export default CommentEditor;
