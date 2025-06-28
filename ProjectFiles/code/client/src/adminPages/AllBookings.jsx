import { useEffect, useState } from "react";
import axios from "axios";
import "./AllBooking.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const navigate=useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/api/admin/all-bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    };
    fetch();
  }, []);

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
      <div>
      <h2>All Bookings</h2>
      <div className="booking-list">
      {bookings.map((booking, index) => (
      <div key={index} className="booking-card">
        <p><strong>Flight:</strong> {booking.flightNumber}</p>
        <p><strong>Date:</strong> {booking.date}</p>
        <p><strong>From:</strong> {booking.origin}</p>
        <p><strong>To:</strong> {booking.destination}</p>
        <p><strong>Departure:</strong> {booking.departureTime}</p>
        <p><strong>Arrival:</strong> {booking.arrivalTime}</p>
        <p><strong>Starting Price:</strong> ₹{booking.startingPrice}</p>
        <p><strong>Available Seats:</strong> {booking.availableSeats}</p>
        <p><strong>Mobile:</strong> {booking.mobile}</p>
        <p><strong>Email:</strong> {booking.email}</p>

        <p><strong>Passengers:</strong></p>
        <ol className="list">
          {booking.passengers.map((p, i) => (
            <li key={i}> {p.name} (Age: {p.age}) - Seat: {p.seatNumber}</li>
          ))}
        </ol>

        <p><strong>Total Fare:</strong> ₹{booking.totalAmount}</p>
        <p><strong>Status:</strong> {booking.status || "confirmed"}</p>
      </div>
    ))}
    </div>
    </div>
    </>
  );
};

export default AllBookings;
