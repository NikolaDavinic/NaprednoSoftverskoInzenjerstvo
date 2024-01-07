import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../contexts/auth.context";

interface ProtectedRoutesProps {
    isAllowed?: boolean;
    redirectPath?: string;
    children?: React.ReactNode;
}

const ProtectedRoutes = ({
    redirectPath ="/signin",
}: ProtectedRoutesProps) => {
    const { isAuthentificated } = useAuthContext();
    console.log("rg");
    return isAuthentificated() ? <Outlet /> : <Navigate to={redirectPath} />;
}

export default ProtectedRoutes;