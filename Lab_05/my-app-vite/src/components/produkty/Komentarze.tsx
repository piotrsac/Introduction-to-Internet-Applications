import { useState, useEffect } from "react";
import Komentarz from "./Komentarz";

interface User {
  id: number;
  username: string;
  fullName: string;
}

interface Comment {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: User;
}

interface CommentsResponse {
  comments: Comment[];
  total: number;
  skip: number;
  limit: number;
}

function Komentarze() {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    fetch("https://dummyjson.com/comments")
      .then((response) => response.json())
      .then((data: CommentsResponse) => {
        setComments(data.comments);
      })
      .catch((error) => {
        console.error("Błąd pobierania danych:", error);
      });
  }, []);

  return (
    <div>
      <h2>Komentarze pobrane z API</h2>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <Komentarz
            key={comment.id}
            id={comment.id}
            body={comment.body}
            postId={comment.postId}
            likes={comment.likes}
            user={comment.user}
          />
        ))
      ) : (
        <p>Ładowanie komentarzy...</p>
      )}
    </div>
  );
}

export default Komentarze;
