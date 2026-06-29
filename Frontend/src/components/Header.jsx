import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-between align-items-center mb-2">

      <h4
        className="fw-bold mb-0"
        style={{
          color: "#03c6fc",
          fontFamily:"cursive"
        }}
      >
        VMM Feedback System
      </h4>

      <button
        className="btn btn-primary btn-sm"
        onClick={() => navigate("/admin-login")}
      >
        Admin Login
      </button>

    </div>
  );
}

export default Header;