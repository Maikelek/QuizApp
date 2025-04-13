import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Loading from "../pages/components/Loading";

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { user, loading } = useUser();

    if (loading) return <Loading />;

    if (!user) {
        return <Navigate to="/" replace />;
    }

    if (adminOnly && user.isAdmin !== 1) {
        return <Navigate to="/" replace />;
    }


    return children;
};

export default ProtectedRoute;