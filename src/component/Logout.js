import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Perform logout logic
        localStorage.removeItem("token");
        navigate("/login"); // Redirect to the login page
    }, [navigate]); // Dependency array ensures this runs on component mount

    return null; // No UI is rendered for this component
};

export default Logout;
