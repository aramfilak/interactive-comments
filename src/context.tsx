import React, { createContext, useContext, useEffect, useState } from "react";
import data from "./assets/data.json";
import amyrobsonImage from "./assets/images/avatars/image-amyrobson.png";
import maxblagunImage from "./assets/images/avatars/image-maxblagun.png";
import ramsesmironImage from "./assets/images/avatars/image-ramsesmiron.png";
import juliusomoImage from "./assets/images/avatars/image-juliusomo.png";
import { User, Comment } from "./comment";

export const userImages: { [key: string]: string } = {
  amyrobson: amyrobsonImage,
  maxblagun: maxblagunImage,
  ramsesmiron: ramsesmironImage,
  juliusomo: juliusomoImage,
};

interface Props {
  children: React.ReactNode;
}

type AppContextValue = {
  currentUser: User;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  deleteComment: (arg: number) => void;
  commentID: number;
  setCommentID: React.Dispatch<React.SetStateAction<number>>;
};

const currentUser: User = data.currentUser;
const AppContext = createContext<null | AppContextValue>(null);
const Provider: React.FC<Props> = ({ children }) => {
  const [comments, setComments] = useState<Comment[]>(data.comments);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [commentID, setCommentID] = useState<number>(0);
  const deleteComment = (commentID: number): void => {
    const undeletedComments: Comment[] = comments.filter((comment) => {
      if (comment.id === commentID) {
        return false;
      }
      if (comment.replies) {
        comment.replies = comment.replies.filter((reply) => reply.id !== commentID);
      }
      return true;
    });
    setComments(undeletedComments);
  };
  return (
    <AppContext.Provider
      value={{
        currentUser,
        comments,
        setComments,
        showModal,
        setShowModal,
        deleteComment,
        commentID,
        setCommentID,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default Provider;

export const useGlobalContext = () => useContext(AppContext);
