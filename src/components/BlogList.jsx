import React, { useEffect, useState } from 'react';
import { getAllBlogs } from '../services/api';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getAllBlogs().then(response => setBlogs(response.data));
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold my-4">All Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map(blog => (
          <div key={blog.id} className="p-4 border rounded shadow">
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            <p>{blog.content.slice(0, 100)}...</p>
            <Link to={`/blog/${blog.id}`} className="text-blue-500 hover:underline">Read more</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
