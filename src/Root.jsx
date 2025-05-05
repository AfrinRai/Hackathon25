import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import Navbar from './Home/Navbar';

const links = (
    <>
        <li><NavLink to='/' className={({ isActive }) => isActive ? 'text-blue-700' : ''}>Homepage</NavLink></li>
        <li><NavLink to='/job' className={({ isActive }) => isActive ? 'text-blue-700' : ''}>Job</NavLink></li>
        <li><NavLink to='/improve-cgpa' className={({ isActive }) => isActive ? 'text-blue-700' : ''}>Improve CGPA</NavLink></li>
        <li><NavLink to='/dashboard' className={({ isActive }) => isActive ? 'text-blue-700' : ''}>Dashboard</NavLink></li>
        <li><NavLink to='/fashion-planner' className={({ isActive }) => isActive ? 'text-blue-700' : ''}>Fashion Planner</NavLink></li>
    </>
);

const Root = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet>
                
            </Outlet>
        </div>
    );
};

export default Root;