import { useEffect, useState } from "react";
import axios from "axios";
import "./Flights.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Flights = () => {
  const [flights, setFlights] = useState([]);
  const navigate=useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/api/admin/all-flights", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFlights(res.data);
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

     <div className="all-flights-container">
  <h2>All Flights</h2>
  {flights.length === 0 ? (
    <p>No flights available.</p>
  ) : (
    flights.map((f, i) => (
      <div className="flight-card" key={i}>
        <p><strong>{f.flightNumber}</strong> ({f.origin} → {f.destination})</p>
        <p>Date: {f.date}</p>
        <p>Departure: {f.departureTime} | Arrival: {f.arrivalTime}</p>
        <p>Price: ₹{f.startingPrice} | Seats Available: {f.availableSeats}</p>
      </div>
    ))
  )}
</div>
    </>
  );
};

export default Flights;
