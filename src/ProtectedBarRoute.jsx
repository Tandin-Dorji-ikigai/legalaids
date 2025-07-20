import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {jwtDecode} from 'jwt-decode';

const ProtectedBarRoute = ({ children }) => {
    const { userInfo } = useSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        }else {
            const token = userInfo.jwt;
            const decodedToken = jwtDecode(token);

            const currentTime = Date.now() / 1000; // in seconds
            if (decodedToken.exp < currentTime || userInfo.user.authorities[0].authority !== "Bar Council") {
                navigate('/login');
            }
        }
    }, [userInfo, navigate]);

    if (!userInfo) {
        // Optionally render null or a loading spinner while redirecting
        return null;
    }

    return children;
};

export default ProtectedBarRoute;
