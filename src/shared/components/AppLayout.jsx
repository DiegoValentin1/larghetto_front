import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import SuperSidebar from "./SuperSidebar";
import UserSidebar from "./UserSidebar";
import UserNavbar from "./UserNavbar";
import { useSidebar } from "../contexts/SidebarContext";

const AppLayout = ({ option }) => {
    const { isExpanded } = useSidebar();
    const sidebarWidth = isExpanded ? '240px' : '80px';

    return <div style={{
        marginLeft: sidebarWidth,
        paddingTop: '8vh',
        minHeight: '100vh',
        width: `calc(100% - ${sidebarWidth})`,
        backgroundColor: "#F3F4F6",
        overflowX: 'hidden',
        transition: 'margin-left 0.3s ease, width 0.3s ease'
    }}>
        {
            option == 1 ? (
                <>
                <AdminSidebar />
                <UserNavbar />
                <Outlet/>
                </>
            ) : (
                option == 2 ? (
                    <><SuperSidebar />
                    <UserNavbar />
                    <Outlet/></>
                ) : (
                    option == 3 ? (
                        <>
                            <UserSidebar />
                            <UserNavbar />
                            <Outlet/>
                        </>
                    ) : (
                        option == 4 && (
                            <>
                            <UserSidebar />
                            <Outlet/>
                        </>
                        )
                    )
                )
            )}
        
    </div>;
};

export default AppLayout;