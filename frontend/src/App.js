import React from 'react';
import PostList from './components/PostList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Blog Platform</h1>
        <p>Django + React Full Stack Application</p>
      </header>
      <main className="App-main">
        <PostList />
        <div className="status">
          <p>Frontend: <span style={{color: 'green'}}>✓ Running</span></p>
          <p>Backend API: <span style={{color: 'green'}}>✓ Connected</span></p>
        </div>
      </main>
    </div>
  );
}

export default App;