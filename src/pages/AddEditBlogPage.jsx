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
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found. User might not be authenticated.');
          navigate('/'); // Redirect to login page if no token
          return;
        }

        try {
          const response = await axios.get(`http://localhost:3001/blog/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setTitle(response.data.title);
          setBody(response.data.body);
        } catch (error) {
          console.error('Error fetching blog:', error);
          if (error.response && error.response.status === 401) {
            navigate('/'); // Redirect to login page if unauthorized
          }
        }
      };
      fetchBlog();
    }
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found. User might not be authenticated.');
      navigate('/'); // Redirect to login page if no token
      return;
    }

    try {
      if (isEditMode) {
        await axios.patch(`http://localhost:3001/blog/${id}`, { title, body }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.post('http://localhost:3001/blog', { title, body }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      navigate('/home');
    } catch (error) {
      console.error('Error saving blog:', error);
      if (error.response && error.response.status === 401) {
        navigate('/login'); // Redirect to login page if unauthorized
      }
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found. User might not be authenticated.');
      navigate('/login'); // Redirect to login page if no token
      return;
    }

    try {
      await axios.delete(`http://localhost:3001/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/');
    } catch (error) {
      console.error('Error deleting blog:', error);
      if (error.response && error.response.status === 401) {
        navigate('/login'); // Redirect to login page if unauthorized
      }
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
