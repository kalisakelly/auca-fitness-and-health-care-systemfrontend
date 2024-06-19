import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BlogDetail = () => {
  const { id } = useParams(); // Retrieve the id parameter from the URL
  const [blog, setBlog] = useState(null); // State to hold the blog details
  const [comments, setComments] = useState([]); // State to hold comments
  const [newComment, setNewComment] = useState(''); // State to hold the new comment

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/blog/${id}`); // Fetch blog details based on id
        setBlog(response.data); // Set the fetched blog data to state
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/blog/${id}/comments`); // Fetch comments based on blog id
        setComments(response.data); // Set the fetched comments data to state
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchBlog();
    fetchComments();
  }, [id]); // Fetch blog details whenever id changes

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3001/blog/${id}/comments`, { body: newComment });
      setComments([...comments, response.data]); // Update comments state with the new comment
      setNewComment(''); // Clear the comment input field
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const handleLike = async () => {
    try {
      await axios.patch(`http://localhost:3001/blog/${id}/like`);
      setBlog({ ...blog, likes: blog.likes + 1 });
    } catch (error) {
      console.error('Error liking blog:', error);
    }
  };

  if (!blog) {
    return (
      <div className="container mx-auto py-6">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center mb-4">
          <img
            className="w-12 h-12 rounded-full mr-4"
            src={blog.author.avatar}
            alt={blog.author.name}
          />
          <div>
            <h2 className="text-lg font-bold">{blog.author.name}</h2>
            <p className="text-gray-600">{new Date(blog.createdat).toLocaleDateString()}</p>
          </div>
        </div>
        <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
        <p className="mb-4">{blog.body}</p>
        <div className="flex justify-between items-center mb-4">
          <div className="flex">
            {blog.tags && blog.tags.map((tag, index) => (
              <span key={index} className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold mr-2 text-gray-700">{tag}</span>
            ))}
          </div>
          <div className="flex space-x-4">
            <span className="text-gray-600">{blog.views} views</span>
            <span className="text-gray-600">{blog.likes} likes</span>
          </div>
        </div>
        <button onClick={handleLike} className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded">
          Like
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-bold mb-4">Comments</h3>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="mb-4">
              <p>{comment.body}</p>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
        <form onSubmit={handleCommentSubmit} className="mt-4">
          <textarea
            className="w-full p-2 border rounded"
            rows="3"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button type="submit" className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mt-2">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogDetail;
