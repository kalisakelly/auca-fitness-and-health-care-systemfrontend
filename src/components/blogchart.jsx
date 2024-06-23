import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const BlogChart = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [{
      label: 'Blog Views',
      data: [],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    }],
  });

  useEffect(() => {
    axios.get('http://localhost:3000/blogs')
      .then((response) => {
        const blogs = response.data;
        const labels = blogs.map(blog => blog.title);
        const views = blogs.map(blog => blog.views);
        setData({
          labels,
          datasets: [{
            label: 'Blog Views',
            data: views,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          }],
        });
      });
  }, []);

  return (
    <div className="max-w-2xl mx-auto my-10">
      <h2 className="text-2xl font-bold mb-5">Blog Views</h2>
      <Bar data={data} />
    </div>
  );
};

export default BlogChart;
