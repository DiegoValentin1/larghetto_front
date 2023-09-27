import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import SuperSidebar from "./SuperSidebar";
import UserSidebar from "./UserSidebar";
import UserNavbar from "./UserNavbar";

const AppLayout = ({ option }) => {
    return <div style={{
        padding: '8vh 0px 0px 7vw',
        overflow: "hidden",
        backgroundColor: "#e6e6e6"
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