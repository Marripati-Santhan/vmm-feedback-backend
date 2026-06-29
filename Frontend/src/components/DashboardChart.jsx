import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function DashboardChart({
  totalFeedbacks,
  totalReviews,
}) {
  const data = {
    labels: [
      "Store Feedbacks",
      "Staff Reviews",
    ],
    datasets: [
      {
        label: "Count",
        data: [
          totalFeedbacks,
          totalReviews,
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <div className="card shadow border-0 mt-4">
      <div className="card-body">
        <h5 className="fw-bold mb-3">
          Feedback Analytics
        </h5>

        <Bar
          data={data}
          options={options}
        />
      </div>
    </div>
  );
}

export default DashboardChart;