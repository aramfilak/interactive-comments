import "./App.scss";
import React from "react";
import CommentEditor from "./components/CommentEditor";
import amyrobsonImage from "./assets/images/avatars/image-amyrobson.png";
import maxblagunImage from "./assets/images/avatars/image-maxblagun.png";
import ramsesmironImage from "./assets/images/avatars/image-ramsesmiron.png";
import juliusomoImage from "./assets/images/avatars/image-juliusomo.png";
import { useGlobalContext } from "./context";

import UserComment from "./components/UserComment";

const userImages: { [key: string]: string } = {
  amyrobson: amyrobsonImage,
  maxblagun: maxblagunImage,
  ramsesmiron: ramsesmironImage,
  juliusomo: juliusomoImage,
};

const App: React.FC = (): JSX.Element => {
  const { currentUser, comments } = useGlobalContext()!;
  const renderedComments = comments.map((comment, idx) => {
    return (
      <div
        className="user-comment"
        key={`${idx}-${comment.user.username}-${comment.createdAt}`}
      >
        <UserComment
          id={comment.id}
          content={comment.content}
          createdAt={comment.createdAt}
          score={comment.score}
          user={comment.user}
          userImage={userImages[comment.user.username]}
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
      <div className="container">
        <div className="comments">{renderedComments}</div>
        <CommentEditor send userImage={userImages[currentUser.username]} />
      </div>
    </div>
  );
};

export default App;
