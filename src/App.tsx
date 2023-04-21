import React, { useState } from "react";
import data from "./assets/data.json";
import "./App.scss";
import CommentEditor from "./components/CommentEditor";
import amyrobsonImage from "./assets/images/avatars/image-juliusomo.png";
import maxblagunImage from "./assets/images/avatars/image-maxblagun.png";
import ramsesmironImage from "./assets/images/avatars/image-ramsesmiron.png";
import juliusomoImage from "./assets/images/avatars/image-juliusomo.png";
import { useGlobalContext } from "./context";

const userImages: { [key: string]: string } = {
  amyrobson: amyrobsonImage,
  maxblagun: maxblagunImage,
  ramsesmiron: ramsesmironImage,
  juliusomo: juliusomoImage,
};

const App: React.FC = (): JSX.Element => {
  const { currentUser } = useGlobalContext()!;

  return (
    <div className="app">
      <div className="container">
        <CommentEditor userImage={userImages[currentUser.username]} />
      </div>
    </div>
  );
};

export default App;
