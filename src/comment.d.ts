interface User {
  image: {
    png: string;
    webp: string;
  };
  username: string;
}
interface Reply {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  replyingTo: string;
  user: User;
}
interface Comment {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replies: Reply[];
}

export { User, Reply, Comment };
