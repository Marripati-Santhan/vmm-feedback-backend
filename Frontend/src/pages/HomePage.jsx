import Header from "../components/Header";
import FeedbackCard from "../components/FeedbackCard";
import StarRating from "../components/StarRating";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import CardHeader from "../components/CardHeader";
import CountUp from "react-countup";

import bgImage from "../assets/Images/VMMbg1.jpg";

import { opinions } from "../data/dashboardData";

function HomePage() {
  const [recentFeedbacks, setRecentFeedbacks] = useState([]);

  useEffect(() => {
    fetchRecentFeedbacks();
    fetchStoreStats();
  }, []);

  const fetchRecentFeedbacks = async () => {
    try {
      const response = await axios.get(
       "https://vmm-feedback-backend.onrender.com/api/store-feedback"
      );

      setRecentFeedbacks(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchStoreStats = async () => {

  try {

    const response = await axios.get(
      "https://vmm-feedback-backend.onrender.com/api/store-feedback/stats"
    );

    setStats(response.data);

  } catch (error) {
    console.error(error);
  }

};
  const [stats, setStats] = useState({
  averageRating: 0,
  totalReviews: 0,
});
const features = [
  "Quick Billing",
  "Friendly Staff",
  "Helpful Employees",
  "Wide Product Collection",
  "Clean Shopping Environment",
];

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <div
          style={{
            minHeight: "100vh",
            background: "rgba(0,0,0,0.70)",
          }}
        >
          <div
  className="container-fluid py-3"
  style={{
    paddingLeft: "20px",
    paddingRight: "20px",
  }}
>

            {/* Header */}
            <Header />

            {/* Welcome Banner */}
           <motion.div
  initial={{ opacity: 0, y: -40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="card border-0 shadow-lg my-4"
  style={{
    background: "rgba(255,255,255,0.12)",
    backdropFilter: "blur(18px)",
    borderRadius: "22px",
    overflow: "hidden",
    color: "white",
  }}
>
  {/* Header */}
  <div
    style={{
      background: "linear-gradient(135deg,#198754,#157347)",
      padding: "14px 25px",
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <span
        style={{
          fontSize: "1.7rem",
        }}
      >
        🏪
      </span>

      <h2
        className="fw-bold m-0"
        style={{
          fontSize: "1.7rem",
        }}
      >
        Vishal Mega Mart
      </h2>
    </div>
  </div>

  {/* Body */}
  <div
    className="card-body text-center"
    style={{
      padding: "28px 24px",
    }}
  >
    <h3
      className="fw-light"
      style={{
        marginBottom: "8px",
      }}
    >
      Customer Feedback Portal
    </h3>

    <div
      style={{
        fontSize: "26px",
        margin: "8px 0 12px",
      }}
    >
      ⭐⭐⭐⭐⭐
    </div>

    <p
      style={{
        maxWidth: "650px",
        margin: "0 auto",
        fontSize: "18px",
        lineHeight: "1.6",
      }}
    >
      Your feedback helps us improve every shopping experience.
      Thank you for helping us serve you better.
    </p>
  </div>
</motion.div>

            {/* Feedback Cards */}
            <div className="row g-3">
              
              <FeedbackCard
                title="Store Services"
                description="Share your feedback about our store services."
                buttonText="Give Feedback"
                buttonClass="btn-success"
                path="/store-services"
              />

              <FeedbackCard
                title="Staff Reviews"
                description="Rate and review our employees on their service."
                buttonText="Rate Staff"
                buttonClass="btn-success"
                path="/staff-reviews"
              />

            </div>

            {/* Most Valuable Opinions */}
           <div className="mt-4">

 <div
                className="card shadow border-0"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(15px)",
                  color: "white",
                }}
              >

                <CardHeader
icon="📊"
title="Customer Satisfaction Score"
/>

    <div className="card-body text-center">

     <h1 className="fw-bold text-success display-4">
  {stats.averageRating}/5
</h1>

      <p className="mb-0">
        Based on {stats.totalReviews} Reviews
      </p>

    </div>

  </div>

</div>

{/* {Key Features} */}
<div className="mt-4">

  
  <div
                className="card shadow border-0"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(15px)",
                  color: "white",
                }}
              >

                <div
                  className="card-header"
                  style={{
                    background: "transparent",
                  }}
                >
      <CardHeader
icon="⭐"
title="Why Customers Love Vishal Mega Mart"
/>
    </div>

    <div className="card-body">

  {features.map((feature, index) => (

    <motion.div
      key={index}
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.3,
      }}
      viewport={{ once: true }}
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "16px",
        fontSize: "18px",
      }}
    >
      <span
        style={{
          width: "28px",
          color: "#FFD700",
          fontSize: "20px",
        }}
      >
        ⭐
      </span>

      <span>{feature}</span>

    </motion.div>

  ))}

</div>

  </div>

</div>

            {/* Recent Activities */}
            <div className="mt-4">

              <div
                className="card shadow border-0"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(15px)",
                  color: "white",
                }}
              >

                <div
                  className="card-header"
                  style={{
                    background: "transparent",
                  }}
                >
                  <CardHeader
icon="💬"
title="Recent Customer Activities"
/>
                </div>

                <div className="card-body">

                 {recentFeedbacks.length > 0 ? (
  recentFeedbacks.map((feedback, index) => (
    <motion.div
      key={feedback.id}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.15,
      }}
      viewport={{ once: true }}
      whileHover={{
        scale: 1.02,
      }}
      className="mb-3"
    >
      <div
        style={{
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: "16px",
          padding: "18px",
          transition: ".3s",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "12px",
          }}
        >
          <span
            style={{
              fontSize: "24px",
              marginRight: "10px",
            }}
          >
            👤
          </span>

          <div>
            <small
              style={{
                color: "#bdbdbd",
              }}
            >
              Customer
            </small>

            <div
              style={{
                fontWeight: "bold",
                fontSize: "17px",
              }}
            >
              {feedback.customer_name || "Anonymous"}
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop:
              "1px solid rgba(255,255,255,.15)",
            margin: "12px 0",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <span
            style={{
              fontSize: "22px",
              marginRight: "10px",
            }}
          >
            💬
          </span>

          <div>
            <small
              style={{
                color: "#bdbdbd",
              }}
            >
              Review
            </small>

            <div
              style={{
                marginTop: "4px",
                lineHeight: "1.6",
              }}
            >
              {feedback.comment}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  ))
) : (
  <div
    className="text-center py-4"
    style={{
      opacity: .7,
    }}
  >
    <h5>No feedback available yet 😊</h5>
  </div>
)}

                </div>

              </div>

            </div>

            {/* Footer */}
           <div
  className="text-center mt-5 py-4"
  style={{
    color: "white",
    opacity: .85,
  }}
>

  <hr
    style={{
      borderColor: "rgba(255,255,255,.2)",
    }}
  />

  <h6
    className="mb-2"
    style={{
      letterSpacing: "1px",
    }}
  >
    © 2026 Vishal Mega Mart
  </h6>

  <small>
    Customer Feedback Management System
  </small>

  <br />

  <small>
    Developed by :  <strong>Marripati Santhan</strong>
  </small>

</div>

          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;