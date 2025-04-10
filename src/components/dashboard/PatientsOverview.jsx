import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register required components for the chart
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
  datasets: [
    {
      label: 'Medical patients',
      backgroundColor: '#9C2677', // primary dark
      data: [1200, 1900, 3000, 2250, 2750, 2200, 2000, 2100],
    },
    {
      label: 'Appointed patients',
      backgroundColor: '#D48ABB', // lighter shade of #9C2677
      data: [1000, 1600, 2500, 1700, 1800, 1600, 1500, 1800],
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    tooltip: {
      // Custom tooltip options
      enabled: true,
      backgroundColor: '#333',
      titleColor: '#fff',
      bodyColor: '#fff',
      padding: 10,
      bodyFont: {
        size: 14,
        weight: 'bold',
      },
    },
    legend: {
      labels: {
        color: '#333',
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        color: '#555',
      },
    },
    x: {
      ticks: {
        color: '#555',
      },
    },
  },
};

const PatientsOverview = () => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">Patients overview</h2>
        <span className="text-sm text-gray-400">2023</span>
      </div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default PatientsOverview;
