import React, { createContext, useContext, useState } from "react";
import data from "./assets/data.json";

type User = {
  image: {
    png: string;
    webp: string;
  };
  username: string;
};
type Reply = {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  replyingTo: string;
  user: User;
};
export type Comment = {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replies: Reply[];
};
type Comments = Comment[];

interface Props {
  children: React.ReactNode;
}

type AppContextValue = {
  currentUser: User;
  comments: Comments;
  setComments: React.Dispatch<React.SetStateAction<Comments>>;
};

const currentUser: User = data.currentUser;
const AppContext = createContext<null | AppContextValue>(null);
const Provider: React.FC<Props> = ({ children }) => {
  const [comments, setComments] = useState<Comment[]>(data.comments);

  return (
    <AppContext.Provider value={{ currentUser, comments, setComments }}>
      {children}
    </AppContext.Provider>
  );
};
export default Provider;

export const useGlobalContext = () => useContext(AppContext);
