import { useState } from "react";
import { useNavigate } from "react-router-dom";
import adminBg from "../assets/Images/Dashboardbg1.jpg";

function AdminLogin() {
const navigate = useNavigate();

const [username, setUsername] = useState("");
const [password, setPassword] = useState("");

const handleLogin = () => {
if (
username === "admin" &&
password === "admin7337"
) {
localStorage.setItem(
"isAdminLoggedIn",
"true"
);

  navigate("/admin-dashboard");
} else {
  alert("Invalid Credentials");
}

};

return (
<div
style={{
minHeight: "100vh",
backgroundImage: `url(${adminBg})`,
backgroundSize: "cover",
backgroundPosition: "center",
backgroundRepeat: "no-repeat",
padding: "10px",
}}
>
<div
className="d-flex justify-content-center"
style={{
paddingTop: "10px",
}}
>
<div
className="card shadow"
style={{
width: "100%",
maxWidth: "400px",
borderRadius: "15px",
}}
> <div className="card-body p-4"> <h3 className="text-center fw-bold mb-4">
Admin Login </h3>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <input
          type="password"
          className="form-control mb-4"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          className="btn btn-success w-100"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  </div>
</div>


);
}

export default AdminLogin;
