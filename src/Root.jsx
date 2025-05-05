import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Home/Navbar';

const links = (
    <>
        <li><NavLink to='/' className={({ isActive }) => isActive ? 'text-blue-700' : ''}>Homepage</NavLink></li>
        <li><NavLink to='/job' className={({ isActive }) => isActive ? 'text-blue-700' : ''}>Job</NavLink></li>
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