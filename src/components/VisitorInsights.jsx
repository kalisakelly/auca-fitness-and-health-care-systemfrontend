import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const VisitorInsights = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Loyal Customers',
        data: [10, 20, 30, 25, 15, 40, 30, 20, 15, 30, 35, 20],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'New Customers',
        data: [5, 10, 20, 15, 10, 25, 20, 15, 10, 20, 25, 15],
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
      {
        label: 'Unique Customers',
        data: [8, 12, 18, 22, 28, 32, 40, 35, 30, 28, 25, 22],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow h-96">
      <h3 className="text-xl font-bold mb-4">Visitor Insights</h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default VisitorInsights;
