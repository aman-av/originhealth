import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import { AuthContextProvider } from "./context/AuthContext";
import { DBContextProvider } from "./context/DBContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./components/AdminDashboard";
import AdminaccessRoute from './components/AdminaccessRoute'
function App() {
  return (
    <div>
      <Container fluid>
        <AuthContextProvider>
            <DBContextProvider>

          <Routes>
            <Route path='/' element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
              <Route path='/admin'
                
                element={
                  <AdminaccessRoute>

                    <AdminDashboard 
                  />
                  </AdminaccessRoute>
                  } />
              <Route path="/dashboard"
                element={
                  <ProtectedRoute>
                  <Dashboard/>
            </ProtectedRoute>
                } />
            </Routes>
            
                </DBContextProvider>
        </AuthContextProvider>
      </Container>
    </div>
  );
}

export default App;
