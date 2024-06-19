import { Doughnut } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const StudyTypeChart = () => {
  const data = {
    labels: ['Groups of 20 students', 'Groups of 10 students', 'Groups of 5 students', 'Individual sessions'],
    datasets: [
      {
        label: 'Students by type of studying',
        data: [20, 20, 15, 7],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow h-96">
      <h3 className="text-xl font-bold mb-4">Students by type of studying</h3>
      <Doughnut data={data} options={options} />
      <div className="mt-4">
        <ul>
          {data.labels.map((label, index) => (
            <li key={index}>{label}: {data.datasets[0].data[index]} ( {Math.round((data.datasets[0].data[index] / data.datasets[0].data.reduce((a, b) => a + b, 0)) * 100)}%)</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudyTypeChart;
