import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const AddEditBlogPage = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      const fetchBlog = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/blog/${id}`);
          setTitle(response.data.title);
          setBody(response.data.body);
        } catch (error) {
          console.error('Error fetching blog:', error);
        }
      };
      fetchBlog();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await axios.patch(`http://localhost:3001/blog/${id}`, { title, body });
      } else {
        await axios.post(`http://localhost:3001/blog`, { title, body });
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving blog:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/blog/${id}`);
      navigate('/');
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">{isEditMode ? 'Edit Blog' : 'Add New Blog'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Body</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full p-2 border rounded"
            rows="10"
            required
          />
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
          >
            {isEditMode ? 'Update Blog' : 'Add Blog'}
          </button>
          {isEditMode && (
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete Blog
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddEditBlogPage;
