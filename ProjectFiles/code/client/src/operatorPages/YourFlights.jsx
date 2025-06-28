import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const YourFlights = () => {
  const [flights, setFlights] = useState([]);
  const navigate=useNavigate();
  

  useEffect(() => {
    const fetchFlights = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:3000/api/operator/operator-flights", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFlights(res.data);
      } catch (err) {
        console.error("Failed to fetch operator flights", err);
      }
    };

    fetchFlights();
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
        <div className="flight-list">
      <h2>Your Added Flights</h2>
      {flights.map((f, i) => (
        <div key={i} className="flight-card">
          <p><strong>{f.flightNumber}</strong> ({f.origin} → {f.destination})</p>
          <p>Date: {f.date} | Departure: {f.departureTime} | Arrival: {f.arrivalTime}</p>
          <p>Price: ₹{f.startingPrice} | Seats: {f.availableSeats}</p>
        </div>
      ))}
    </div>
    </>
  );
};

export default YourFlights;
