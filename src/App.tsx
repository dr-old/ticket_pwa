import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import PrivateRoute from "./router/route";
import AuthProvider from "./context/useAuth";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Ticket from "./pages/Ticket";
import Register from "./pages/Register";
import CreateTicket from "./pages/ticket/CreateTicket";

function App() {
  return (
    <div className="App">
      <Toaster />
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<PrivateRoute />}>
              <Route element={<Layout />}>
                {/* Define other routes here, which will be rendered inside Layout */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/ticket" element={<Ticket />} />
                <Route path="/create-ticket" element={<CreateTicket />} />
                {/* Add more routes as needed */}
              </Route>
            </Route>
            {/* Other routes */}
            {/* Redirect from "/" to "/dashboard" */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            {/* Add a fallback route for undefined paths */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
