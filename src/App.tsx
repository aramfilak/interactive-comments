import "./App.scss";
import React from "react";
import data from "./assets/data.json";
import CommentEditor from "./components/CommentEditor";
import amyrobsonImage from "./assets/images/avatars/image-amyrobson.png";
import maxblagunImage from "./assets/images/avatars/image-maxblagun.png";
import ramsesmironImage from "./assets/images/avatars/image-ramsesmiron.png";
import juliusomoImage from "./assets/images/avatars/image-juliusomo.png";
import { useGlobalContext } from "./context";
import userComment from "./components/UserComment";
import UserComment from "./components/UserComment";

const userImages: { [key: string]: string } = {
  amyrobson: amyrobsonImage,
  maxblagun: maxblagunImage,
  ramsesmiron: ramsesmironImage,
  juliusomo: juliusomoImage,
};

const App: React.FC = (): JSX.Element => {
  const { currentUser } = useGlobalContext()!;

  const renderedComments = data.comments.map((comment, idx) => {
    return (
      <div className="comments">
        {/*Comment*/}
        <UserComment
          key={`${idx}-${comment.user.username}`}
          id={comment.id}
          content={comment.content}
          createdAt={comment.createdAt}
          score={comment.score}
          user={comment.user}
          userImage={userImages[comment.user.username]}
        />
        <div className="replies">
          {/*Comment Replies*/}
          {comment.replies.map((reply, idx) => {
            return (
              <UserComment
                userImage={userImages[reply.user.username]}
                id={reply.id}
                content={reply.content}
                createdAt={reply.createdAt}
                score={reply.score}
                user={reply.user}
              />
            );
          })}
        </div>
      </div>
    );
  });

  return (
    <div className="app">
      <div className="container">
        {renderedComments}
        <CommentEditor send userImage={userImages[currentUser.username]} />
      </div>
    </div>
  );
};

export default App;
