import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddFlight.css";
import { Link } from "react-router-dom";

const AddFlight = () => {
  const [flightData, setFlightData] = useState({
    flightNumber: "",
    origin: "",
    destination: "",
    date: "",
    departureTime: "",
    arrivalTime: "",
    startingPrice: "",
    availableSeats: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFlightData({ ...flightData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post("http://localhost:3000/api/operator/operator-flights", flightData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Flight added successfully!");
      navigate("/yourFlights"); // Redirect to operator's flights page
    } catch (error) {
      console.error("Flight add error:", error);
      alert("Failed to add flight. Please try again.");
    }
  };

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
      <div className="add-flight-container">
      <h2>Add New Flight</h2>
      <form onSubmit={handleSubmit} className="flight-form">
        <input type="text" name="flightNumber" placeholder="Flight Number" value={flightData.flightNumber} onChange={handleChange} required />
        <input type="text" name="origin" placeholder="Origin" value={flightData.origin} onChange={handleChange} required />
        <input type="text" name="destination" placeholder="Destination" value={flightData.destination} onChange={handleChange} required />
        <input type="date" name="date" value={flightData.date} onChange={handleChange} required />
        <input type="time" name="departureTime" placeholder="Departure Time" value={flightData.departureTime} onChange={handleChange} required />
        <input type="time" name="arrivalTime" placeholder="Arrival Time" value={flightData.arrivalTime} onChange={handleChange} required />
        <input type="number" name="startingPrice" placeholder="Starting Price (₹)" value={flightData.startingPrice} onChange={handleChange} required />
        <input type="number" name="availableSeats" placeholder="Available Seats" value={flightData.availableSeats} onChange={handleChange} required />
        <button type="submit">Add Flight</button>
      </form>
    </div>
    </>
  );
};

export default AddFlight;
