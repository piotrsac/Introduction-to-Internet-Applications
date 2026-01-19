import { useState } from "react";

interface User {
  id: number;
  username: string;
  fullName: string;
}

interface KomentarzProps {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: User;
}

function Komentarz({ id, body, postId, likes, user }: KomentarzProps) {
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => setLikeCount((prev) => prev + 1);
  const handleDislike = () => setLikeCount((prev) => prev - 1);

  return (
    <div>
      <div>
        <div>
          <h4>{user.fullName}</h4>
          <span>@{user.username}</span>
        </div>
      </div>

      <div style={{ margin: "10px 0", fontSize: "14px", lineHeight: "1.5" }}>
        {body}
      </div>

      <div>
        <span style={{ fontSize: "10px", color: "#ffffff" }}>
          Post ID: {postId} | Comment ID: {id}
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            onClick={handleDislike}
            style={{
              background: "none",
              border: "1px solid #ddd",
              borderRadius: "4px",
              cursor: "pointer",
            }}>
            👎
          </button>

          <span
            style={{
              fontWeight: "bold",
              minWidth: "20px",
              textAlign: "center",
            }}>
            {likeCount}
          </span>

          <button
            onClick={handleLike}
            style={{
              background: "none",
              border: "1px solid #ddd",
              borderRadius: "4px",
              cursor: "pointer",
            }}>
            👍
          </button>
        </div>
      </div>
    </div>
  );
}

export default Komentarz;
