import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import "./BooktTicket.css"

const BookTicket = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const flight = state?.flight;

  const [passengers, setPassengers] = useState([
    { name: '', age: '', gender: '', seatNumber: '' }
  ]);
useEffect(() => {
  if (flight?.startingPrice) {
    setTotalAmount(passengers.length * flight.startingPrice);
  }
}, [flight]);
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const pricePerSeat = flight?.startingPrice || 1500;


  const handleChange = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
    setTotalAmount(updated.length * pricePerSeat);
  };

  const addPassenger = () => {
    setPassengers([
      ...passengers,
      { name: '', age: '', gender: '', seatNumber: '' }
    ]);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:3000/api/user/book",
        {
          flightId: flight._id,
          flightNumber: flight.flightNumber,
          flightName: flight.flightName,
          origin: flight.origin,
          destination: flight.destination,
          date: flight.date,
          departureTime: flight.departureTime,
          arrivalTime: flight.arrivalTime,
          startingPrice: flight.startingPrice,
          availableSeats: flight.availableSeats,
          passengers,
          totalAmount,
          mobile,
          email,
          bookingDate: new Date().toISOString().split("T")[0],
          bookingTime: new Date().toLocaleTimeString()
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("Booking Confirmed!");
      navigate("/Bookings");
    } catch (err) {
      console.error(err);
      alert("Failed to book.");
    }
  };

  return (
    <div className="booking-form">
      <h2>Enter Passenger Details</h2>

      {/* Flight Info */}
      {flight && (
        <div className="flight-info">
          <p><strong>Flight Number:</strong> {flight.flightNumber}</p>
          <p><strong>From:</strong> {flight.origin}</p>
          <p><strong>To:</strong> {flight.destination}</p>
          <p><strong>Date:</strong> {flight.date}</p>
          <p><strong>Departure:</strong> {flight.departureTime}</p>
          <p><strong>Arrival:</strong> {flight.arrivalTime}</p>
          <p><strong>Price:</strong> ₹{flight.startingPrice}</p>
        </div>
      )}

      {/* Mobile & Email */}
      <input
        type="text"
        placeholder="Mobile Number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {/* Passengers */}
      {passengers.map((p, i) => (
        <div key={i}>
          <input
            placeholder="Name"
            value={p.name}
            onChange={(e) => handleChange(i, "name", e.target.value)}
          />
          <input
            placeholder="Age"
            type="number"
            value={p.age}
            onChange={(e) => handleChange(i, "age", e.target.value)}
          />
          <select
            value={p.gender}
            onChange={(e) => handleChange(i, "gender", e.target.value)}
          >
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input
            placeholder="Seat No"
            value={p.seatNumber}
            onChange={(e) => handleChange(i, "seatNumber", e.target.value)}
          />
        </div>
      ))}

      <button onClick={addPassenger}>Add Passenger</button>
      <p>Total Amount: ₹{totalAmount}</p>
      <button onClick={handleSubmit}>Confirm Booking</button>
    </div>
  );
};

export default BookTicket;
