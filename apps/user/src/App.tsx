import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const UserDashboard = () => {
  return (
    <div>
      <h1>User Dashboard</h1>
      <p>Welcome to the User App (Microfrontend)</p>
      <p>This is a placeholder. Migration in progress...</p>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<UserDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

