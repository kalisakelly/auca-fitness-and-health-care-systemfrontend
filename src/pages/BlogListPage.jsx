import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BlogListPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3001/blog', {
          params: {
            page: currentPage,
            search: searchTerm,
          },
        });
        setBlogs(response.data.blogs || []);
        setTotalPages(Math.ceil(response.data.totalBlogs / 6)); // Adjust based on your pagination logic
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [currentPage, searchTerm]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Blogs</h1>
        <button
          onClick={() => navigate('/add-blog')}
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        >
          Add New Blog
        </button>
      </div>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex items-center mb-4">
              {renderAvatar(blog.createdby?.name)}
              <div className="ml-4">
                <h2 className="text-lg font-bold">{blog.createdby?.name}</h2>
                <p className="text-gray-600">{new Date(blog.createdat).toLocaleDateString()}</p>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-4">{blog.title}</h2>
            <p className="mb-4">{blog.body.slice(0, 100)}...</p>
            <div className="flex justify-between items-center mb-4">
              <div className="flex space-x-4">
                <span className="text-gray-600">{blog.views || 0} views</span>
                <span className="text-gray-600">{blog.likes || 0} likes</span>
              </div>
              <button
                onClick={() => navigate(`/blog/${blog.id}`)}
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
              >
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-1 rounded ${currentPage === index + 1 ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BlogListPage;
