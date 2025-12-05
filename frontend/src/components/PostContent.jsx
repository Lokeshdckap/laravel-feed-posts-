import { useState, useEffect } from "react";
import { Card, Space } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import axiosClient from "../../axiosClient";

const PostContent = ({ isFetch }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axiosClient
      .get("/get-posts")
      .then(({ data }) => {
        setPosts(data?.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, [isFetch]);

  const handleLike = async (postId, isLiked) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !isLiked,
              likes_count: isLiked
                ? post.likes_count - 1
                : post.likes_count + 1,
            }
          : post
      )
    );

    try {
      if (isLiked) {
        await axiosClient.delete(`/posts/${postId}/like`);
      } else {
        await axiosClient.post("/likes", { post_id: postId });
      }
    } catch (error) {
      setPosts(
        posts.map((post) =>
          post.id === postId
            ? {
                ...post,
                isLiked: isLiked,
                likes_count: isLiked
                  ? post.likes_count + 1
                  : post.likes_count - 1,
              }
            : post
        )
      );
      message.error("Something went wrong while updating like.");
      console.error(error);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        {posts.map((post) => (
          <Card key={post.id} bordered>
            <h3
              style={{
                marginBottom: "12px",
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              {post.title}
            </h3>
            <p
              style={{ marginBottom: "16px", color: "#333", lineHeight: "1.6" }}
            >
              {post.body}
            </p>
            <div style={{ paddingTop: "12px", borderTop: "1px solid #f0f0f0" }}>
              <button
                onClick={() => handleLike(post.id, post.isLiked)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 12px",
                }}
              >
                {post?.isLiked ? (
                  <HeartFilled style={{ fontSize: "20px", color: "#e0245e" }} />
                ) : (
                  <HeartOutlined style={{ fontSize: "20px", color: "#666" }} />
                )}
                <span style={{ fontSize: "14px", color: "#666" }}>
                  {post?.likes_count || 0}
                </span>
              </button>
            </div>
          </Card>
        ))}
      </Space>
    </div>
  );
};

export default PostContent;
