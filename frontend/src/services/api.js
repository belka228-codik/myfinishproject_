const API_BASE = 'http://localhost:8000/api';

export const api = {
  async getPosts() {
    const response = await fetch(`${API_BASE}/posts/`);
    return await response.json();
  },

  async createPost(postData) {
    const response = await fetch(`${API_BASE}/posts/create/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData)
    });
    return await response.json();
  },

  async testConnection() {
    const response = await fetch(`${API_BASE}/test/`);
    return await response.json();
  }
};
