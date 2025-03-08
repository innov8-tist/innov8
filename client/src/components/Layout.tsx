import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Sidebar } from "./layout/sidebar";

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const location = useLocation();
    const isDashboard = location.pathname.includes("/dashboard");

    return (
        <div className="flex">
            {isDashboard && <Sidebar  />}
            <main className={`flex-1 p-4 ${isDashboard ? "ml-1" : ""}`}>
                {children}
            </main>
        </div>
    );
}

