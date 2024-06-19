import React, { useState, useEffect } from 'react';
import { commentOnBlog } from '../services/api';

const BlogComments = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    // Fetch comments for the blog post
    // Assuming blog has a comments property that contains an array of comments
    // setComments(blog.comments);
  }, [blogId]);

  const handleComment = () => {
    // Add logic to handle authentication and token retrieval
    const token = 'your-authentication-token';
    commentOnBlog(blogId, text, token).then(response => {
      setComments([...comments, response.data]);
      setText('');
    });
  };

  return (
    <div className="mt-4">
      <h2 className="text-2xl font-bold">Comments</h2>
      <div className="mb-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          placeholder="Add a comment"
        />
        <button onClick={handleComment} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
          Comment
        </button>
      </div>
      <div>
        {comments.map((comment, index) => (
          <div key={index} className="mb-2 p-2 border rounded">
            <p>{comment.text}</p>
            <span className="text-gray-500">- {comment.user}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogComments;
