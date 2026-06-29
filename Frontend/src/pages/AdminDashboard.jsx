import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import QRCodeCard from "../components/QRCodeCard";
import DashboardChart from "../components/DashboardChart";

function AdminDashboard() {
  const navigate = useNavigate();

  const [totalFeedbacks, setTotalFeedbacks] =
    useState(0);

  const [totalReviews, setTotalReviews] =
    useState(0);

  const [topEmployee, setTopEmployee] =
    useState({});

  const [recentReviews, setRecentReviews] =
    useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const feedbackResponse =
        await axios.get(
          "https://vmm-feedback-backend.onrender.com/api/store-feedback/total-store-feedbacks/all"
        );

      const reviewResponse =
        await axios.get(
          "https://vmm-feedback-backend.onrender.com/api/staff-reviews/total-staff-reviews"
        );

      const employeeResponse =
        await axios.get(
          "https://vmm-feedback-backend.onrender.com/api/staff-reviews/top-employee"
        );

      const recentResponse =
        await axios.get(
          "https://vmm-feedback-backend.onrender.com/api/staff-reviews/recent-reviews"
        );

      setTotalFeedbacks(
        feedbackResponse.data.total
      );

      setTotalReviews(
        reviewResponse.data.total
      );

      setTopEmployee(
        employeeResponse.data
      );

      setRecentReviews(
        recentResponse.data
      );
    } catch (error) {
      console.error(
        "Dashboard Error:",
        error
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(
      "isAdminLoggedIn"
    );

    navigate("/admin-login");
  };

  return (
    <>
      <div className="container py-4">

        {/* Header */}

        <div className="d-flex justify-content-between align-items-center mb-4">

          <h2 className="fw-bold mb-0">
            Admin Dashboard
          </h2>

          <button
            className="btn btn-danger"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

        {/* Analytics Cards */}

        <div className="row g-3">

          <div className="col-md-4">

            <div className="card shadow border-0">

              <div className="card-body text-center">

                <h6 className="text-muted">
                  Total Store Feedbacks
                </h6>

                <h2 className="fw-bold text-primary">
                  {totalFeedbacks}
                </h2>

              </div>

            </div>

          </div>

          <div className="col-md-4">

            <div className="card shadow border-0">

              <div className="card-body text-center">

                <h6 className="text-muted">
                  Total Staff Reviews
                </h6>

                <h2 className="fw-bold text-success">
                  {totalReviews}
                </h2>

              </div>

            </div>

          </div>

          <div className="col-md-4">

            <div className="card shadow border-0">

              <div className="card-body text-center">

                <h6 className="text-muted">
                  Top Rated Employee
                </h6>

                <h5 className="fw-bold">
                  {topEmployee.employee_name ||
                    "N/A"}
                </h5>

                <p className="mb-0">
                  ⭐
                  {topEmployee.average_rating ||
                    0}
                  /5
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Recent Reviews */}

        <div className="card shadow border-0 mt-4">

          <div className="card-header bg-white">

            <h5 className="mb-0 fw-bold">
              Recent Staff Reviews
            </h5>

          </div>

          <div className="card-body">

            {recentReviews.length > 0 ? (
              recentReviews.map(
                (review, index) => (
                  <div
                    key={index}
                    className="border-bottom py-2"
                  >
                    <strong>
                      {
                        review.customer_name
                      }
                    </strong>

                    <p className="mb-1">
                      {review.comment}
                    </p>

                    <small className="text-muted">
                      {new Date(
                        review.created_at
                      ).toLocaleString()}
                    </small>
                  </div>
                )
              )
            ) : (
              <p>
                No Reviews Available
              </p>
            )}

          </div>

        </div>

        <DashboardChart
  totalFeedbacks={totalFeedbacks}
  totalReviews={totalReviews}
/>
        <QRCodeCard />

      </div>
    </>
  );
}

export default AdminDashboard;