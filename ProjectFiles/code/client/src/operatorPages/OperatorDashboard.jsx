import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const OperatorDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    // ✅ No token or wrong role → redirect to login
    if (!token || role !== 'operator') {
      navigate('/login');
    }

    // Optional: Validate token with backend here if needed
  }, []);

  return (
    <>
    <div className="full-top">
        <div className="top">
          <p className="data1">SB Flights (Operator)</p>
          <div className="data2">
            <Link to="/operator-dashboard" className="phome">Home</Link>
            <Link to="/Addflight" className="bookings">New Flight</Link>
            <Link to="/flightBookings" className="bookings">Bookings</Link>
            <Link to="/yourFlights" className="bookings">Flights</Link>
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
      <div>
      <h1>Operator Dashboard</h1>
    </div>
    <div className='Homess'>
        <div className='showusers'>
          <p className='head'>Add Flight</p>
          <p> flight</p>
          <button className='viebtn' onClick={() => navigate("/Addflight")}>Add Flight</button>
        </div>
        <div className='showbookings'>
          <p className='head'>Bookings</p>
          <p>bookings</p>
          <button className='viebtn' onClick={() => navigate("/flightBookings")}>View All</button>
        </div>
        <div className='showflights'>
          <p className='head'>Flights</p>
          <p>flights</p>
          <button className='viebtn' onClick={() => navigate("/yourFlights")}>View All</button>
        </div>
      </div>
    </>
  );
};

export default OperatorDashboard;
