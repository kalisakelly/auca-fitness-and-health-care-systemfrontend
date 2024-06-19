import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      setLoading(true);
      try {
        const blogResponse = await axios.get(`http://localhost:3001/blog/${id}`);
        setBlog(blogResponse.data);
        setComments(blogResponse.data.comments || []);
        // Increment views count
        await axios.patch(`http://localhost:3001/blog/${id}/view`);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3001/blog/${id}/comment`, { text: newComment });
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (err) {
      console.error('Error posting comment:', err);
    }
  };

  const handleLike = async () => {
    try {
      await axios.patch(`http://localhost:3001/blog/${id}/like`);
      setBlog({ ...blog, likes: blog.likes + 1 });
    } catch (err) {
      console.error('Error liking blog:', err);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-6">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-6">
        <p>Error loading blog: {error.message}</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container mx-auto py-6">
        <p>No blog found.</p>
      </div>
    );
  }

  const renderAvatar = (username) => {
    const initials = username
      ? username[0].toUpperCase()
      : String.fromCharCode(65 + Math.floor(Math.random() * 26)) + String.fromCharCode(65 + Math.floor(Math.random() * 26));
    return (
      <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center">
        {initials}
      </div>
    );
  };

  return (
    <div className="container mx-auto py-6">
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center mb-4">
          {renderAvatar(blog.createdby?.name)}
          <div className="ml-4">
            <h2 className="text-lg font-bold">{blog.createdby?.name}</h2>
            <p className="text-gray-600">{new Date(blog.createdat).toLocaleDateString()}</p>
          </div>
        </div>
        <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
        <p className="mb-4">{blog.body}</p>
        <div className="flex justify-between items-center mb-4">
          <div className="flex">
            {blog.tags && blog.tags.map((tag) => (
              <span key={tag} className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold mr-2 text-gray-700">{tag}</span>
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
              <p>{comment.text}</p>
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
