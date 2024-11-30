import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import Login from './components/Login';
import Signup from './components/Signup';
import ViewEmployee from './components/ViewEmployee';
import UpdateEmployee from './components/UpdateEmployee';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/employees" element={<EmployeeList />} />
                <Route path="/employees/view/:id" element={<ViewEmployee />} />
                <Route path="/employees/edit/:id" element={<UpdateEmployee />} />
            </Routes>
        </Router>
    );
}

export default App;
