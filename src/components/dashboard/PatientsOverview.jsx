import { useState } from 'react';
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

// Example data for different time ranges
const monthlyData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
  datasets: [
    {
      label: 'Medical patients',
      backgroundColor: '#9C2677',
      data: [1200, 1900, 3000, 2250, 2750, 2200, 2000, 2100],
    },
    {
      label: 'Appointed patients',
      backgroundColor: '#D48ABB',
      data: [1000, 1600, 2500, 1700, 1800, 1600, 1500, 1800],
    },
  ],
};

const yearlyData = {
  labels: ['2020', '2021', '2022', '2023'],
  datasets: [
    {
      label: 'Medical patients',
      backgroundColor: '#9C2677',
      data: [12000, 15000, 18000, 20000],
    },
    {
      label: 'Appointed patients',
      backgroundColor: '#D48ABB',
      data: [11000, 14000, 16000, 18000],
    },
  ],
};

const weeklyData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
  datasets: [
    {
      label: 'Medical patients',
      backgroundColor: '#9C2677',
      data: [120, 150, 180, 200, 230, 210, 250],
    },
    {
      label: 'Appointed patients',
      backgroundColor: '#D48ABB',
      data: [110, 140, 170, 190, 210, 220, 240],
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    tooltip: {
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
  const [selectedFilter, setSelectedFilter] = useState('yearly'); // Default filter is 'yearly'
  const [chartData, setChartData] = useState(yearlyData); // Default chart data is yearly

  // Handle filter change (Year, Month, Week)
  const handleFilterChange = (e) => {
    const filter = e.target.value;
    setSelectedFilter(filter);

    switch (filter) {
      case 'yearly':
        setChartData(yearlyData);
        break;
      case 'monthly':
        setChartData(monthlyData);
        break;
      case 'weekly':
        setChartData(weeklyData); // Update to weekly data
        break;
      default:
        setChartData(yearlyData);
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">Patients overview</h2>
        <div>
          <select
            onChange={handleFilterChange}
            value={selectedFilter}
            className="px-4 py-2 border rounded-md text-sm"
          >
            <option value="yearly">Year</option>
            <option value="monthly">Month</option>
            <option value="weekly">Week</option> {/* Added 1 Week option */}
          </select>
        </div>
      </div>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default PatientsOverview;
