import { Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import UserPage from "./pages/UserPage";
import DashBoard from "./pages/DashBoard";
import RallyToBePage from "./pages/RallyToBePage";
import RallyPage from "./pages/RallyPage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<ErrorPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/user/:id" element={<UserPage />} />
      <Route path="/dashboard" element={<DashBoard />} />
      <Route
        path="/sign-rally/:id"
        element={
          <PrivateRoute>
            <RallyToBePage />
          </PrivateRoute>
        }
      />
      <Route path="/display-rally/:id" element={<RallyPage />} />
    </Routes>
  );
}

export default App;
