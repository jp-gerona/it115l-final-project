import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./components/LogIn";
import DashBoard from "./components/DashBoard";
import Events from "./components/Events";
import Members from "./components/Members";
import Attendance from "./components/Attendance";
import Players from "./components/Players";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/dashboard" element={<DashBoard />}>
          <Route path="events" element={<Events />} />
          <Route path="members" element={<Members />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="players" element={<Players />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
