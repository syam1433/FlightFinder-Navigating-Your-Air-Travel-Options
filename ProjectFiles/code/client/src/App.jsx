import RegisterForm from "./RegsiterPage.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Mainpage from "./Mainpage.jsx";
import LoginPage from "./LoginPage.jsx";
import UserDashboard from "./userPages/UserDashboard.jsx";
import AdminDashboard from "./adminPages/AdminDashboard.jsx";
import OperatorDashboard from "./operatorPages/OperatorDashboard.jsx";
import Bookings from "./userPages/Bookings.jsx";
import BookTicket from "./userPages/BookTicket.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Users from "./adminPages/Users.jsx";
import Flights from "./adminPages/Flights.jsx";
import AllBookings from "./adminPages/AllBookings.jsx";
import AddFlight from "./operatorPages/AddFlight.jsx";
import YourFlights from "./operatorPages/YourFlights.jsx";
import FlightBookings from "./operatorPages/FlightBookings.jsx";

function App() {
  return(
    <Router>
      <Routes>
        <Route path='/' element={<Mainpage />} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path='/registration' element={<RegisterForm />} />
        <Route path="/user-dashboard" element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          } />
          <Route path="/Users" element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          } />
          <Route path="/Flights" element={
            <ProtectedRoute>
              <Flights />
            </ProtectedRoute>
          } />
          <Route path="/AllBookings" element={
            <ProtectedRoute>
              <AllBookings />
            </ProtectedRoute>
          } />
        <Route path="/bookings" element={
            <ProtectedRoute>
              <Bookings />
            </ProtectedRoute>
          }/>
        <Route path="/admin-dashboard" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
        <Route path="/operator-dashboard" element={
            <ProtectedRoute>
              <OperatorDashboard />
            </ProtectedRoute>
          } />
        <Route path="/book-ticket" element={
            <ProtectedRoute>
              <BookTicket />
            </ProtectedRoute>
          } />
          <Route path="/addflight" element={
            <ProtectedRoute>
              <AddFlight />
            </ProtectedRoute>
          } />
          <Route path="/yourFlights" element={<YourFlights />} />
          <Route path="/flightBookings" element={<FlightBookings />} />
      </Routes>
    </Router>
  )
}

export default App;
