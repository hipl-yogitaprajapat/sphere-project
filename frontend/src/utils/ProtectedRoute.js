import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function ProtectedRoute({ setIsAuthenticated }) {
    const location = useLocation();
    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsAuthenticated(true);
            if (location.pathname === '/' ||
                location.pathname === '/login' ||
                location.pathname === '/register'
            ) {
                if (role === 'client') {
                    navigate('/client', { replace: false });
                } else if (role === 'developer') {
                    navigate('/developer', { replace: false });
                } else if (role === 'admin') {
                    navigate('/admin', { replace: false });
                }else if (role === 'designer') {
                    navigate('/designer', { replace: false });
                }else {
                    navigate('/tester', { replace: false });
                }

            }
        }
    }, [location, navigate, setIsAuthenticated])

    return (
        null
    )
}

export default ProtectedRoute