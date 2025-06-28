import { useEffect, useState } from "react";
import axios from "axios";
import "./Users.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate=useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/api/admin/all-users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    };
    fetch();
  }, []);

  const operators = users.filter(user => user.role === "operator");
  const passengers = users.filter(user => user.role === "user");

  return (
    <>
    <div className="full-top">
        <div className="top">
          <p className="data1">SB Flights (Admin)</p>
          <div className="data2">
            <Link to="/Admin-dashboard" className="phome">Home</Link>
            <Link to="/Users" className="bookings">Users</Link>
            <Link to="/AllBookings" className="bookings">Bookings</Link>
            <Link to="/Flights" className="bookings">Flights</Link>
            <div>
              <button className="logout" onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                navigate("/login");
              }}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="users-section">
      <h2>Operators</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th><th>Approved</th>
          </tr>
        </thead>
        <tbody>
          {operators.map((u, i) => (
            <tr key={i}>
              <td>{u.email}</td>
              <td>{u.approved ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Passengers</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th><th>Role</th>
          </tr>
        </thead>
        <tbody>
          {passengers.map((u, i) => (
            <tr key={i}>
              <td>{u.email}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default Users;
