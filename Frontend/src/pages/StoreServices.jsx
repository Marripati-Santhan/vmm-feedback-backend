import { useState } from "react";
import axios from "axios";
import bgImage from "../assets/Images/billingbg1.webp";
import StarRating from "../components/StarRating";

function StoreServices() {
  const [formData, setFormData] = useState({
    customerName: "",
    comment: "",
    suggestion: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.comment.trim()) {
      alert("Comment is required");
      return;
    }

    try {
      const response = await axios.post(
        "https://vmm-feedback-backend.onrender.com/api/store-feedback",
  {
    customer_name: formData.customerName,
    comment: formData.comment,
    suggestion: formData.suggestion,
    rating: formData.rating,
  }
      );

      alert(response.data.message);

      setFormData({
        customerName: "",
        comment: "",
        suggestion: "",
        rating: 0,
      });
    } catch (error) {
      console.error(error);

      alert("Failed to submit feedback");
    }
  };

 return (

  <div
    style={{
      minHeight: "100vh",
      backgroundImage: `url(${bgImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundAttachment:"fixed",
    }}
  >
    <div
      style={{
        minHeight: "100vh",
        background: "rgba(0,0,0,0.65)",
        padding: "20px",
      }}
    >
      <div className="container py-4">

```
    <div
      className="card shadow border-0"
      style={{
        background: "rgba(255,255,255,0.20)",
        backdropFilter: "blur(15px)",
        borderRadius: "15px",
        border: "1px solid rgba(255,255,255,0.25)",
        color: "white",
      }}
    >
      <div
        className="card-header"
        style={{
          background: "transparent",
          color: "white",
        }}
      >
        <h3
          className="mb-0 fw-bold"
          style={{
            textShadow:
              "2px 2px 8px rgba(0,0,0,0.8)",
          }}
        >
          Store Services Feedback
        </h3>
      </div>

      <div className="card-body">

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">
              Customer Name (Optional)
            </label>

            <input
              type="text"
              className="form-control"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-3">

  <label className="form-label fw-bold">
    Overall Store Rating
  </label>

  <br />

  <StarRating
    rating={formData.rating}
    editable={true}
    onRatingChange={(rating) =>
      setFormData({
        ...formData,
        rating,
      })
    }
  />

</div>

          <div className="mb-3">
            <label className="form-label">
              Comment *
            </label>

            <textarea
              className="form-control"
              rows="4"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              placeholder="Share your experience..."
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Suggestion (Optional)
            </label>

            <textarea
              className="form-control"
              rows="3"
              name="suggestion"
              value={formData.suggestion}
              onChange={handleChange}
              placeholder="Any suggestions?"
            />
          </div>

          <button
            type="submit"
            className="btn btn-success"
          >
            Submit Feedback
          </button>

        </form>

      </div>
    </div>

  </div>
</div>
```

  </div>
);

}

export default StoreServices;