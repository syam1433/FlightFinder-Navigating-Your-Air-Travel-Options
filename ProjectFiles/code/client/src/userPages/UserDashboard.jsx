import { useState } from "react";
import "./UserDashboard.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();
//   const [departure, setDeparture] = useState("");
//   const [destination, setDestination] = useState("");
//   const [date, setDate] = useState("");
//   const [flights, setFlights] = useState([]);
//   const [searched, setSearched] = useState(false);

//   // Dummy flight data for simulation
//   const dummyFlights = [
//     { from: "Rajahmundry", to: "Delhi", date: "2025-06-21", flight: "RJ456" },
//     { from: "Vizag", to: "Delhi", date: "2025-06-22", flight: "VZ789" },
//     { from: "Rajahmundry", to: "Vizag", date: "2025-06-21", flight: "RJ123" },
//   ];

//   const handleSearch = () => {
//     setSearched(true);
//     const results = dummyFlights
//       .filter(
//         f => f.from === departure && f.to === destination && f.date === date
//       )
//       .map(f => `${f.flight}: ${f.from} → ${f.to} on ${f.date}`);
//     setFlights(results);
//   };
const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [flights, setFlights] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
  setSearched(true);
  try {
    const res = await axios.get("http://localhost:3000/api/flights");
    const filtered = res.data.filter(
      (flight) =>
        flight.origin === departure &&
        flight.destination === destination &&
        flight.date === date
    );
    setFlights(filtered);
  } catch (err) {
    console.error("Error fetching flights:", err);
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

      <div className="flight">
        <img className="img" src="/flight1.jpg" />

        {/* Overlay Flight Result Display */}
       {searched && (
  <div className="overlay-flights">
    {flights.length > 0 ? (
      <div className="flight-scroll-box">
        {flights.map((flight, index) => (
          <div key={index} className="flight-item-row">
            <span className="flight-item">
  {flight.flightNumber}: {flight.origin} → {flight.destination} on {flight.date}
</span>
            <button
  className="book-btn"
  onClick={() => navigate('/book-ticket', { state: { flight } })}
>
  Book Now
</button>

          </div>
        ))}
      </div>
    ) : (
      <p className="flight-item">No available flights</p>
    )}
  </div>
)}

        <div className="overlay-text">
          <p>Embark on an <br /> extraordinary Flight <br /> Booking Adventure!</p>
        </div>
        <div className="overlay-text2">
          <p>
            Unleash your travel desires and book extraordinary flight journeys that will transport you to unforgettable <br />
            destinations, igniting a sense of adventure like never before.
          </p>
        </div>

        <div className="booking">
          <div className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 576 512">
              <path d="M384 128c70.7 0 128 57.3 128 128s-57.3 128-128 128l-192 0c-70.7 0-128-57.3-128-128s57.3-128 128-128l192 0zM576 256c0-106-86-192-192-192L192 64C86 64 0 150 0 256S86 448 192 448l192 0c106 0 192-86 192-192zM192 352a96 96 0 1 0 0-192 96 96 0 1 0 0 192z" />
            </svg>
            <p>Reverse Booking</p>
          </div>

          <div className="booking-flight">
            <select
              className='departurecity'
              name="departurecity"
              onChange={(e) => setDeparture(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>Select Departure City</option>
              <option value="Rajahmundry">Rajahmundry</option>
              <option value="Vizag">Vizag</option>
              <option value="Delhi">Delhi</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Chennai">Chennai</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Pune">Pune</option>
              <option value="Tirupati">Tirupati</option>

            </select>

            <select
              className='destinationcity'
              name="destinationcity"
              onChange={(e) => setDestination(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>Select Destination City</option>
              <option value="Rajahmundry">Rajahmundry</option>
              <option value="Vizag">Vizag</option>
              <option value="Delhi">Delhi</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Chennai">Chennai</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Pune">Pune</option>
              <option value="Tirupati">Tirupati</option>

            </select>

            <input
              className="date"
              type="date"
              onChange={(e) => setDate(e.target.value)}
            />

            <button className="search" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>

        <div className="text-only">
          <h1>About us</h1>
          <div className="text-only2">
           <p>Welcome to our Flight ticket booking app, where we are dedicated to providing you with an exceptional travel experience from start to finish. Whether you're embarking on a daily commute, planning an exciting cross-country adventure, or seeking a leisurely scenic route, our app offers an extensive selection of Flight options to cater to your unique travel preferences.</p>
                        <p>We understand the importance of convenience and efficiency in your travel plans. Our user-friendly interface allows you to effortlessly browse through a wide range of Flight schedules, compare fares, and choose the most suitable seating options. With just a few taps, you can secure your Flight tickets and be one step closer to your desired destination. Our intuitive booking process enables you to customize your travel preferences, such as selecting specific departure times, opting for a window seat, or accommodating any special requirements.</p>
                        <p>With our Flight ticket booking app, you can embrace the joy of exploring new destinations, immerse yourself in breathtaking scenery, and create cherished memories along the way. Start your journey today and let us be your trusted companion in making your Flight travel dreams a reality. Experience the convenience, reliability, and comfort that our app offers, and embark on unforgettable Flight adventures with confidence.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
