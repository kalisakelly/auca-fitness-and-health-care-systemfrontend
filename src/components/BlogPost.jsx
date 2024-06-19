import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogById, viewBlog, likeBlog } from '../services/api';
import BlogComments from './BlogComments';

const BlogPost = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    viewBlog(id);
    getBlogById(id).then(response => setBlog(response.data));
  }, [id]);

  const handleLike = () => {
    // Add logic to handle authentication and token retrieval
    const token = 'your-authentication-token';
    likeBlog(id, token).then(() => {
      setBlog(prevBlog => ({ ...prevBlog, likes: prevBlog.likes + 1 }));
    });
  };

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold my-4">{blog.title}</h1>
      <p>{blog.content}</p>
      <div className="flex justify-between items-center mt-4">
        <button onClick={handleLike} className="bg-blue-500 text-white px-4 py-2 rounded">Like</button>
        <span>{blog.likes} likes</span>
      </div>
      <BlogComments blogId={id} />
    </div>
  );
};

export default BlogPost;
