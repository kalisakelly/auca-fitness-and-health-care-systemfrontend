import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BlogDetailsPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogResponse = await axios.get(`http://localhost:3001/blog/${id}`);
        setBlog(blogResponse.data);

        // Increase view count
        await axios.patch(`http://localhost:3001/blog/${id}/view`);

        const commentsResponse = await axios.get(`http://localhost:3001/blog/${id}/comments`);
        setComments(commentsResponse.data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching blog:', error);
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleLike = async () => {
    try {
      await axios.patch(`http://localhost:3001/blog/${id}/like`);
      setBlog(prevBlog => ({
        ...prevBlog,
        likes: prevBlog.likes + 1,
      }));
    } catch (error) {
      console.error('Error liking blog:', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment) return;

    try {
      const response = await axios.post(`http://localhost:3001/blog/${id}/comment`, { text: newComment });
      setComments(prevComments => [...prevComments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-6">
      {blog ? (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center">
              {blog.createdby.name[0].toUpperCase()}
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-bold">{blog.createdby.name}</h2>
              <p className="text-gray-600">{new Date(blog.createdat).toLocaleDateString()}</p>
            </div>
          </div>
          <p className="mb-4">{blog.body}</p>
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-4">
              <span className="text-gray-600">{blog.views} views</span>
              <span className="text-gray-600">{blog.likes} likes</span>
            </div>
            <button
              onClick={handleLike}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded"
            >
              Like
            </button>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Comments</h2>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="mb-4">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                      {comment.user.name[0].toUpperCase()}
                    </div>
                    <div className="ml-2">
                      <h3 className="text-lg font-bold">{comment.user.name}</h3>
                      <p className="text-gray-600">{new Date(comment.createdat).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <p className="ml-10">{comment.text}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No comments yet.</p>
            )}
            <form onSubmit={handleCommentSubmit} className="mt-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full p-2 border rounded mb-2"
                placeholder="Add a comment..."
              />
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div>Blog not found.</div>
      )}
    </div>
  );
};

export default BlogDetailsPage;
