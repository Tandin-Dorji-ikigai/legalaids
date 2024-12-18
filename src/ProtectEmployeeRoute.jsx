import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedEmployeeRoute = ({ children }) => {
    const { userInfo } = useSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        }else if(userInfo && userInfo.user.authorities[0].authority !== "Employee"){
            navigate('/login');
        }else if(userInfo && userInfo.user.authorities[0].authority === "Employee"){
            navigate('/login');
        }
    }, [userInfo, navigate]);

    if (!userInfo) {
        // Optionally render null or a loading spinner while redirecting
        return null;
    }

    return children;
};

export default ProtectedEmployeeRoute;
