import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

// Use esse hook em qualquer página que precise de login
export function useAuth() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/login');
        }
    }, [navigate]);
}