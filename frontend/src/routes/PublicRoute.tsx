import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/store";

export default function PublicRoute() {
    const token = useAppSelector(s => s.auth.token);
    return token ? <Navigate to="/home" replace /> : <Outlet />;
}
