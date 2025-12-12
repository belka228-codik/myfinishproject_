import axios from "axios";

const API_URL = "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const blogApi = {
  getPosts: (params) => api.get("/blog/posts/", { params }),
  getPost: (id) => api.get(`/blog/posts/${id}/`),
  createPost: (data) => api.post("/blog/posts/", data),
  updatePost: (id, data) => api.put(`/blog/posts/${id}/`, data),
  deletePost: (id) => api.delete(`/blog/posts/${id}/`),
  likePost: (id) => api.post(`/blog/posts/${id}/like/`),
  
  getComments: (postId) => api.get(`/blog/comments/?post=${postId}`),
  createComment: (data) => api.post("/blog/comments/", data),
};

export const authApi = {
  login: (credentials) => api.post("/token/", credentials),
  refresh: (refresh) => api.post("/token/refresh/", { refresh }),
  getProfile: () => api.get("/auth/profile/"),
};

export default api;
