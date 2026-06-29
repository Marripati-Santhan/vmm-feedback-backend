import { useState, useEffect } from "react";
import axios from "axios";

import DepartmentTabs from "../components/DepartmentTabs";
import StarRating from "../components/StarRating";
import groundFloor from "../assets/Images/groundFloor.webp"
import managementBg from "../assets/Images/managementbg1.webp";
import firstFloorBg from "../assets/Images/firstfloorbg1.jpg";
import secondFloorBg from "../assets/Images/secondfloor.jpg";
import employeeImages from "../data/employeeImages";

function StaffReviews() {
  const [selectedDepartment, setSelectedDepartment] =
    useState("groundFloor");

  const [employees, setEmployees] = useState([]);

  const [employeeRatings, setEmployeeRatings] =
    useState([]);

  const [customerName, setCustomerName] =
    useState("");

  const [ratings, setRatings] =
    useState({});

  const [comments, setComments] =
    useState({});

  const departments = [
    {
      label: "Ground Floor",
      value: "groundFloor",
    },
    {
      label: "Management",
      value: "management",
    },
    {
      label: "First Floor",
      value: "firstFloor",
    },
    {
      label: "Second Floor",
      value: "secondFloor",
    },
  ];
  const backgroundImages = {
  groundFloor: groundFloor,
  management: managementBg,
  firstFloor: firstFloorBg,
  secondFloor: secondFloorBg,
};

  useEffect(() => {
    fetchEmployees();
    fetchRatings();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        "https://vmm-feedback-backend.onrender.com/api/employees"
      );

      setEmployees(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRatings = async () => {
    try {
      const response = await axios.get(
        "https://vmm-feedback-backend.onrender.com/api/staff-reviews/ratings"
      );

      setEmployeeRatings(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.department === selectedDepartment
  );

  const getEmployeeRating = (
    employeeId
  ) => {
    return employeeRatings.find(
      (rating) =>
        Number(rating.employee_id) ===
        Number(employeeId)
    );
  };

  const handleRatingChange = (
    employeeId,
    rating
  ) => {
    setRatings({
      ...ratings,
      [employeeId]: rating,
    });
  };

  const handleCommentChange = (
    employeeId,
    value
  ) => {
    setComments({
      ...comments,
      [employeeId]: value,
    });
  };

  const submitReview = async (
    employeeId
  ) => {
    try {
      const reviewData = {
        employee_id: employeeId,
        customer_name:
          customerName || "Random",
        rating:
          ratings[employeeId] || 0,
        comment:
          comments[employeeId] || "",
      };

      const response =
        await axios.post(
          "https://vmm-feedback-backend.onrender.com/api/staff-reviews/submit",
          reviewData
        );

      alert(response.data.message);

      fetchRatings();

      setRatings({
        ...ratings,
        [employeeId]: 0,
      });

      setComments({
        ...comments,
        [employeeId]: "",
      });

    } catch (error) {
      console.error(error);

      alert(
        "Failed to submit review"
      );
    }
  };

 return (

  <div
    style={{
      minHeight: "100vh",
      backgroundImage: `url(${backgroundImages[selectedDepartment]})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
      transition: "all 0.5s ease",
    }}
  >
    <div
      style={{
        minHeight: "100vh",
        background: "rgba(0,0,0,0.40)",
      }}
    >
      <div
        className="container py-3"
        style={{
          maxWidth: "1100px",
        }}
      >
        <div
          className="card shadow border-0"
          style={{
            background: "rgba(255,255,255,0.18)",
            backdropFilter: "blur(4px)",
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
            <h1
              className="mb-0 fw-bold"
              style={{
                textShadow:
                  "2px 2px 8px rgba(0,0,0,0.8)",
              }}
            >
              Staff Reviews
            </h1>
          </div>

      <div className="card-body">

        <div className="mb-4">
          <label className="form-label fw-bold">
            <h5>Customer Name</h5>
          </label>

          <input
            type="text"
            className="form-control"
            placeholder="Enter your name (Optional)"
            value={customerName}
            onChange={(e) =>
              setCustomerName(
                e.target.value
              )
            }
          />
        </div>

        <DepartmentTabs
          departments={departments}
          selectedDepartment={
            selectedDepartment
          }
          setSelectedDepartment={
            setSelectedDepartment
          }
        />

        <div className="row mt-3">

          {filteredEmployees.length > 0 ? (
            filteredEmployees.map(
              (employee) => (
                <div
                  key={employee.id}
                  className="col-lg-6 col-md-6 mb-3"
                >
                  <div
                    className="card shadow-sm h-100"
                    style={{
                      background: "rgba(77, 74, 74, 0.35)",
backdropFilter: "blur(20px)",
WebkitBackdropFilter: "blur(20px)",
border: "1px solid rgba(255,255,255,0.4)",
boxShadow: "0 10px 35px rgba(0,0,0,0.3)"
                    }}
                  >
                    <div className="card-body">

                      <div className="row align-items-center">

                        <div className="col-4 text-center">

                          <img
                            src={
                              employeeImages[
                                employee.photo
                              ] ||
                              employeeImages[
                                "demo1.jpg"
                              ]
                            }
                            alt={
                              employee.employee_name
                            }
                            style={{
                              width: "120px",
                              height: "140px",
                              objectFit: "cover",
                              borderRadius: "12px",
                              border:
                                "3px solid white",
                            }}
                          />

                        </div>

                        <div className="col-8">

                          <h5
  className="fw-bold"
  style={{
    color: "white",
    textShadow: "2px 2px 8px rgba(0,0,0,0.8)"
  }}
>
  Name : {employee.employee_name}
</h5>

                          <h6
                            className="mb-1"
                            style={{
                              color: "white",
                            }}
                          > Role : {}
                            { employee.role}
                          </h6>

                          <h6
                            className="small"
                            style={{
                              color: "white",
                            }}
                          >
                            ID:
                            {" "}
                            {
                              employee.employee_id
                            }
                          </h6>

                          <StarRating
                            rating={
                              getEmployeeRating(
                                employee.id
                              )
                                ?.average_rating ||
                              0
                            }
                          />

                          <div
                            className="small"
                            style={{
                              color: "#f1f1f1",
                            }}
                          >
                            <h6>
                            {
                              getEmployeeRating(
                                employee.id
                              )
                                ?.average_rating ||
                              0
                            }
                            /5
                            {" • "}
                            {
                              getEmployeeRating(
                                employee.id
                              )
                                ?.total_reviews ||
                              0
                            } 
                            
                            Reviews
                            </h6>
                          </div>

                        </div>

                      </div>

                      <hr
                        style={{
                          borderColor:
                            "rgba(255,255,255,0.3)",
                        }}
                      />

                      <div className="mb-3 mt-3 text-center">

                       <label
  className="fw-bold"
  style={{
    color: "white",
    textShadow: "2px 2px 8px rgba(0,0,0,0.8)"
  }}
>
  Rate This Employee
</label>

                        <br />

                        <StarRating
                          rating={
                            ratings[
                              employee.id
                            ] || 0
                          }
                          editable={true}
                          onRatingChange={(
                            rating
                          ) =>
                            handleRatingChange(
                              employee.id,
                              rating
                            )
                          }
                          
                          
                        />
                        

                      </div>

                      <textarea
                        className="form-control mb-3"
                        rows="3"
                        placeholder="Write your review..."
                        value={
                          comments[
                            employee.id
                          ] || ""
                        }
                        onChange={(e) =>
                          handleCommentChange(
                            employee.id,
                            e.target.value
                          )
                        }
                      />

                      <div className="text-center">
                        <button
                          className="btn btn-success"
                          onClick={() =>
                            submitReview(
                              employee.id
                            )
                          }
                        >
                          Submit Review
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              )
            )
          ) : (
            <div className="text-center py-4 text-white">
              <h5>
                No Employees Found
              </h5>
            </div>
          )}

        </div>

      </div>
    </div>
  </div>
</div>

  </div>
);

}

export default StaffReviews;