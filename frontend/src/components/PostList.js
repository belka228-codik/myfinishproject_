import React, { useState, useEffect } from "react";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log("Fetching posts from Django API...");
        const response = await fetch("http://localhost:8000/api/blog/posts/", {
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        });
        
        console.log("Response status:", response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Received data:", data);
        setPosts(data.results || data);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>
          <h2>Loading posts...</h2>
          <p>Connecting to Django API at http://localhost:8000</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.error}>
          <h2>Connection Error</h2>
          <p><strong>Error:</strong> {error}</p>
          <p><strong>Possible causes:</strong></p>
          <ul style={styles.errorList}>
            <li>Django server is not running</li>
            <li>CORS configuration issue</li>
            <li>Network connectivity problem</li>
          </ul>
          <div style={styles.instructions}>
            <h3>How to fix:</h3>
            <ol>
              <li>Open a new terminal</li>
              <li>Navigate to: <code>backend\src</code></li>
              <li>Run: <code>python manage.py runserver</code></li>
              <li>Wait for Django to start on port 8000</li>
              <li>Refresh this page</li>
            </ol>
            <p>Check Django: <a href="http://localhost:8000" target="_blank" rel="noopener noreferrer">http://localhost:8000</a></p>
            <p>Check API: <a href="http://localhost:8000/api/blog/posts/" target="_blank" rel="noopener noreferrer">http://localhost:8000/api/blog/posts/</a></p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Blog Posts</h1>
      <p style={styles.subtitle}>Connected to Django API successfully!</p>
      
      {posts.length === 0 ? (
        <div style={styles.noPosts}>
          <h3>No posts found</h3>
          <p>Add posts through Django admin panel:</p>
          <p>
            <a href="http://localhost:8000/admin" target="_blank" rel="noopener noreferrer" style={styles.link}>
              Go to Django Admin
            </a>
          </p>
          <p>Login: admin / admin123</p>
        </div>
      ) : (
        <div>
          <p style={styles.count}>Found {posts.length} post(s)</p>
          <div style={styles.grid}>
            {posts.map((post) => (
              <div key={post.id} style={styles.card}>
                <h3 style={styles.postTitle}>{post.title}</h3>
                <p style={styles.excerpt}>
                  {post.content.length > 150 
                    ? `${post.content.substring(0, 150)}...` 
                    : post.content}
                </p>
                <div style={styles.meta}>
                  <span style={styles.author}>
                    <strong>Author:</strong> {post.author?.username || "Unknown"}
                  </span>
                  <span style={styles.date}>
                    <strong>Date:</strong> {new Date(post.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div style={styles.stats}>
                  <span style={styles.stat}>?? {post.likes_count || 0} likes</span>
                  <span style={styles.stat}>?? {post.comments_count || 0} comments</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "2rem",
  },
  title: {
    color: "#333",
    marginBottom: "0.5rem",
  },
  subtitle: {
    color: "#28a745",
    marginBottom: "2rem",
    fontWeight: "bold",
  },
  loading: {
    textAlign: "center",
    padding: "3rem",
    background: "#f8f9fa",
    borderRadius: "8px",
    border: "2px dashed #dee2e6",
  },
  error: {
    padding: "2rem",
    background: "#f8d7da",
    color: "#721c24",
    borderRadius: "8px",
    border: "1px solid #f5c6cb",
  },
  errorList: {
    margin: "1rem 0",
    paddingLeft: "1.5rem",
  },
  instructions: {
    marginTop: "2rem",
    padding: "1.5rem",
    background: "#e2f3ff",
    borderRadius: "6px",
  },
  noPosts: {
    textAlign: "center",
    padding: "3rem",
    background: "#f8f9fa",
    borderRadius: "8px",
    border: "2px dashed #dee2e6",
  },
  link: {
    color: "#007bff",
    fontWeight: "bold",
    textDecoration: "none",
  },
  count: {
    color: "#6c757d",
    marginBottom: "1.5rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "2rem",
  },
  card: {
    background: "white",
    padding: "1.5rem",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    transition: "transform 0.2s",
  },
  postTitle: {
    margin: "0 0 1rem 0",
    fontSize: "1.25rem",
    color: "#333",
  },
  excerpt: {
    color: "#666",
    lineHeight: "1.6",
    marginBottom: "1rem",
  },
  meta: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    marginBottom: "1rem",
    paddingTop: "1rem",
    borderTop: "1px solid #eee",
    fontSize: "0.9rem",
  },
  author: {
    color: "#495057",
  },
  date: {
    color: "#6c757d",
  },
  stats: {
    display: "flex",
    gap: "1rem",
  },
  stat: {
    padding: "0.25rem 0.75rem",
    background: "#f8f9fa",
    borderRadius: "20px",
    fontSize: "0.85rem",
    color: "#666",
  },
};

export default PostList;
