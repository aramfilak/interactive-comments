import "./CommentsList.scss";
import React from "react";
import UserComment from "./UserComment";
import { userImages } from "../context";
import { useGlobalContext } from "../context";

const CommentsList: React.FC = (): JSX.Element => {
  const { comments } = useGlobalContext()!;

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

  return <div className="comments">{renderedComments}</div>;
};
export default CommentsList;
