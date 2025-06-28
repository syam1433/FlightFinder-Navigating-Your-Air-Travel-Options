// // import { useEffect, useState } from 'react';
// // import { useNavigate, Link } from 'react-router-dom';
// // import axios from 'axios';
// // import "./Booking.css";

// // const Bookings = () => {
// //   const navigate = useNavigate();
// //   const [bookings, setBookings] = useState([]);

// //   useEffect(() => {
// //     const token = localStorage.getItem('token');
// //     const role = localStorage.getItem('role');

// //     if (!token || role !== 'user') {
// //       navigate('/login');
// //       return;
// //     }

// //     const fetchBookings = async () => {
// //       try {
// //         const res = await axios.get('http://localhost:5000/api/user/bookings', {
// //           headers: {
// //             Authorization: `Bearer ${token}`
// //           }
// //         });
// //         setBookings(res.data);
// //       } catch (err) {
// //         console.error(err);
// //         alert('Failed to fetch bookings');
// //       }
// //     };

// //     fetchBookings();
// //   }, []);

// //   const handleLogout = () => {
// //     localStorage.removeItem('token');
// //     localStorage.removeItem('role');
// //     navigate('/login');
// //   };

// //   return (
// //     <div className="full-top">
// //       <div className="top">
// //         <p className="data1">SB Flights</p>
// //         <div className="data2">
// //           <Link to="/" className="phome">Home</Link>
// //           <Link to="/Bookings" className="bookings">Bookings</Link>
// //           <button className="logout" onClick={handleLogout}>Logout</button>
// //         </div>
// //       </div>

// //       <div className="booking-section">
// //   <h2>Your Bookings</h2>
// //   {bookings.length === 0 ? (
// //     <p>No bookings found.</p>
// //   ) : (
// //     <div className="booking-grid">
// //       {bookings.map((b) => (
// //         <div className="booking-box" key={b._id}>
// //           <p><strong>Flight:</strong> {b.flightNumber}</p>
// //           <p><strong>From:</strong> {b.origin}</p>
// //           <p><strong>To:</strong> {b.destination}</p>
// //           <p><strong>Date:</strong> {b.date}</p>
// //           <p><strong>Seats:</strong> {b.seats}</p>
// //         </div>
// //       ))}
// //     </div>
// //   )}
// // </div>

// //     </div>
// //   );
// // };

// // export default Bookings;

// // src/pages/Bookings.js
// // import { useEffect, useState } from "react";
// // import axios from "axios";

// // const Bookings = () => {
// //   const [bookings, setBookings] = useState([]);

// //   useEffect(() => {
// //     const fetchBookings = async () => {
// //       const token = localStorage.getItem("token");
// //       const res = await axios.get("http://localhost:3000/api/user/bookings", {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });
// //       setBookings(res.data);
// //     };

// //     fetchBookings();
// //   }, []);

// //   return (
// //     <div className="bookings">
// //       <h2>Your Bookings</h2>
// //       {bookings.map((booking, index) => (
// //         <div key={index} className="booking-card">
// //           <p><strong>Flight:</strong> {booking.flightNumber}</p>
// //           <p><strong>Date:</strong> {booking.date}</p>
// //           <p><strong>From:</strong> {booking.origin}</p>
// //           <p><strong>To:</strong> {booking.destination}</p>
// //           <p><strong>Passenger:</strong> {booking.passengerName}</p>
// //           <p><strong>Seats:</strong> {booking.seatNumbers.join(", ")}</p>
// //           <p><strong>Total Fare:</strong> ₹{booking.totalFare}</p>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // export default Bookings;



// import { useEffect, useState } from "react";
// import axios from "axios";

// const Bookings = () => {
//   const [bookings, setBookings] = useState([]);

//   useEffect(() => {
//     const fetchBookings = async () => {
//       const token = localStorage.getItem("token");
//       const res = await axios.get("http://localhost:3000/api/user/bookings", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setBookings(res.data);
//     };

//     fetchBookings();
//   }, []);

//   return (
//     <div className="bookings">
//       <h2>Your Bookings</h2>
//       {bookings.map((booking, index) => (
//         <div key={index} className="booking-card">
//           <p><strong>Flight:</strong> {booking.flightNumber}</p>
//           <p><strong>Date:</strong> {booking.date}</p>
//           <p><strong>From:</strong> {booking.origin}</p>
//           <p><strong>To:</strong> {booking.destination}</p>

//           <p><strong>Passengers:</strong></p>
//           <ul>
//             {booking.passengers.map((p, i) => (
//               <li key={i}>
//                 {p.name} (Age: {p.age}, Seat: {p.seatNumber}, Gender: {p.gender || "N/A"})
//               </li>
//             ))}
//           </ul>

//           <p><strong>Total Fare:</strong> ₹{booking.totalAmount}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Bookings;


import { useEffect, useState } from "react";
import axios from "axios";
import "./Booking.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const navigate=useNavigate();

  useEffect(() => {
  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/api/user/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  fetchBookings();
}, []);

const cancelTicket = async (bookingId) => {
  try {
    const token = localStorage.getItem("token");
    await axios.put(`http://localhost:3000/api/user/cancel/${bookingId}`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setBookings(prev => prev.map(b => 
      b._id === bookingId ? { ...b, status: "cancelled" } : b
    ));
    alert("Booking cancelled successfully!");
  } catch (err) {
    console.error("Error cancelling booking:", err);
    alert("Failed to cancel ticket.");
  }
};


  return (
    <>
    <div className="full-top">
        <div className="top">
          <p className="data1">SB Flights</p>
          <div className="data2">
            <Link to="/user-dashboard" className="phome">
              Home
            </Link>
            <Link to="/Bookings" className="bookings">
              Bookings
            </Link>
            <div>
              <button
                className="logout"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("role");
                  navigate("/login");
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bookinges">
  <h2>Your Bookings</h2>
  <div className="booking-list">
    {bookings.length === 0 ? (
    <p>No bookings found.</p>
  ) : (
    bookings.map((booking, index) => (
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

        {booking.status !== "cancelled" && (
          <button
            onClick={() => cancelTicket(booking._id)}
            className="cancel-btn"
          >
            Cancel Ticket
          </button>
        )}
      </div>
    ))
  )}
  </div>
</div>

    </>
  );
};

export default Bookings;

