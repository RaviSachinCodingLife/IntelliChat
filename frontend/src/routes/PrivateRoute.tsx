import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/store";

export default function PrivateRoute() {
    const token = useAppSelector(s => s.auth.token);
    return token ? <Outlet /> : <Navigate to="/login" replace />;
}
