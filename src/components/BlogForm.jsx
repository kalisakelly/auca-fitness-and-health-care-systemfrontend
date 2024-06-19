import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createBlog, updateBlog, getBlogById } from '../services/api';

const BlogForm = ({ isEdit = false }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (isEdit) {
      getBlogById(id).then(response => {
        setTitle(response.data.title);
        setContent(response.data.content);
      });
    }
  }, [id, isEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { title, content };
    // Add logic to handle authentication and token retrieval
    const token = 'your-authentication-token';

    if (isEdit) {
      updateBlog(id, data, token).then(() => navigate(`/blog/${id}`));
    } else {
      createBlog(data, token).then(() => navigate('/'));
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold my-4">{isEdit ? 'Edit Blog' : 'Create Blog'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {isEdit ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
