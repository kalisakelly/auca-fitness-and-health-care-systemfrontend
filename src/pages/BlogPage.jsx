import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:3001/blog');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const handleReadMore = async (id) => {
    try {
      await axios.patch(`http://localhost:3001/blog/${id}/view`);
      navigate(`/blog/${id}`);
    } catch (error) {
      console.error('Error viewing blog:', error);
    }
  };

  const handleLike = async (id) => {
    try {
      await axios.patch(`http://localhost:3001/blog/${id}/like`);
      setBlogs(blogs.map(blog => 
        blog.id === id ? { ...blog, likes: blog.likes + 1 } : blog
      ));
    } catch (error) {
      console.error('Error liking blog:', error);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {blogs.length > 0 ? (
            blogs.map((blog, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="flex items-center mb-4">
                  <img
                    className="w-12 h-12 rounded-full mr-4"
                    src={blog.author.avatar}
                    alt={blog.author.name}
                  />
                  <div>
                    <h2 className="text-lg font-bold">{blog.author.name}</h2>
                    <p className="text-gray-600">{blog.author.date}</p>
                  </div>
                </div>
                <p className="mb-4">{blog.content}</p>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex">
                    {blog.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold mr-2 text-gray-700">{tag}</span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <span className="text-gray-600">{blog.stats.views} views</span>
                    <span className="text-gray-600">{blog.likes} likes</span>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleReadMore(blog.id)}
                    className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Read More
                  </button>
                  <button
                    onClick={() => handleLike(blog.id)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded"
                  >
                    Like
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow p-6 mb-6 text-center">
              <p className="text-gray-600">There are no blogs yet.</p>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1">
          {/* My Schedule */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">My Schedule</h2>
              <a href="/schedule" className="text-orange-500 hover:text-orange-700">
                View All &gt;
              </a>
            </div>
            <ul>
              {/* Schedule data should be fetched and mapped here */}
            </ul>
          </div>

          {/* Week Plan */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold mb-4">Week Plan</h2>
              <a className="text-orange-500 hover:text-orange-700">
                View All &gt;
              </a>
            </div>
            <ul>
              {/* Week plan data should be fetched and mapped here */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
