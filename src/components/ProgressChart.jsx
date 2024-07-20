import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const ProgressChart = ({ data }) => {
    const chartData = {
        labels: data.dates, // Array of dates
        datasets: [
            {
                label: 'Progress',
                data: data.values, // Array of values
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
        ],
    };

    return (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Progress Chart</h2>
            <Line data={chartData} />
        </div>
    );
};

export default ProgressChart;
