import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
const [flights, setFlights] = useState([]);
const [bookings, setBookings] = useState([]);
const [pendingOps, setPendingOps] = useState([]);


  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'admin') {
      navigate('/login');
      return;
    }

    const fetchDashboardData = async () => {
  try {
    const token = localStorage.getItem("token");

    const [usersRes, flightsRes, bookingsRes, pendingRes] = await Promise.all([
      axios.get("http://localhost:3000/api/admin/all-users", { headers: { Authorization: `Bearer ${token}` } }),
      axios.get("http://localhost:3000/api/admin/all-flights", { headers: { Authorization: `Bearer ${token}` } }),
      axios.get("http://localhost:3000/api/admin/all-bookings", { headers: { Authorization: `Bearer ${token}` } }),
      axios.get("http://localhost:3000/api/admin/pending-operators", { headers: { Authorization: `Bearer ${token}` } }),
    ]);

    setUsers(usersRes.data);
    setFlights(flightsRes.data);
    setBookings(bookingsRes.data);
    setPendingOps(pendingRes.data);
  } catch (err) {
    console.error("Error loading dashboard:", err);
  }
};

fetchDashboardData();

  }, [navigate]);
  const handleApproval = async (id, isApproved) => {
  const token = localStorage.getItem('token');
  try {
    const url = isApproved
      ? `http://localhost:3000/api/admin/approve-operator/${id}`
      : `http://localhost:3000/api/admin/reject-operator/${id}`;

    await axios.put(url, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });

    alert(isApproved ? 'Operator approved!' : 'Operator rejected.');

    // Reload the list
    setPendingOps(prev => prev.filter(op => op._id !== id));
  } catch (err) {
    console.error('Approval error:', err);
    alert('Action failed');
  }
};


  return (
    <div>
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

      <div className='Homess'>
        <div className='showusers'>
          <p className='head'>Users</p>
          <p>{users.length} users</p>
          <button className='viebtn' onClick={() => navigate("/Users")}>View All</button>
        </div>
        <div className='showbookings'>
          <p className='head'>Bookings</p>
          <p>{bookings.length} bookings</p>
          <button className='viebtn' onClick={() => navigate("/AllBookings")}>View All</button>
        </div>
        <div className='showflights'>
          <p className='head'>Flights</p>
          <p>{flights.length} flights</p>
          <button className='viebtn' onClick={() => navigate("/Flights")}>View All</button>
        </div>
      </div>

      <div className="pending-ops">
        <div className="pending-ops">
  <h3>New Operator Applications</h3>

          {pendingOps.length === 0 ? (
            <p>No pending applications.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th><th>Email</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingOps.map((op) => (
                  <tr key={op._id}>
                    <td>{op.name}</td>
                    <td>{op.email}</td>
                    <td>
                      <button onClick={() => handleApproval(op._id, true)} className="approve-btn">Confirm</button>
                      <button onClick={() => handleApproval(op._id, false)} className="reject-btn">Reject</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        
      </div>
    </div>
  );
};

export default AdminDashboard;
