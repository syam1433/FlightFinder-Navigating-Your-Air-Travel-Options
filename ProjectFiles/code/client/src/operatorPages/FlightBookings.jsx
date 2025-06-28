import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const FlightBookings = () => {
  const [bookings, setBookings] = useState([]);
  const navigate=useNavigate();
  

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:3000/api/operator/operator-bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data);
      } catch (err) {
        console.error("Failed to fetch operator bookings", err);
      }
    };

    fetchBookings();
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
      <h2>Bookings for Your Flights</h2>
    <div className="booking-list">
      
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        bookings.map((b, i) => (
          <div key={i} className="booking-card">
            <p><strong>{b.passengerName}</strong> ({b.email})</p>
            <p>Flight: {b.flightNumber} | {b.origin} → {b.destination}</p>
            <p>Date: {b.date} | Departure: {b.departureTime}</p>
            <p>Booking Date: {b.bookingDate} | Time: {b.bookingTime}</p>
          </div>
        ))
      )}
    </div>
    </>
  );
};

export default FlightBookings;
