import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import PrivateRoute from "./router/route";
import AuthProvider from "./context/useAuth";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Ticket from "./pages/Ticket";

function App() {
  return (
    <div className="App">
      <Toaster />
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route element={<Layout />}>
                {/* Define other routes here, which will be rendered inside Layout */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/ticket" element={<Ticket />} />
                {/* Add more routes as needed */}
              </Route>
            </Route>
            {/* Other routes */}
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
