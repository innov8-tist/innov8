import { ReactNode } from "react";
import { Sidebar } from "@/components/layout/sidebar";

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div className="flex min-h-screen bg-slate-50">
            <div className="flex-1 animate-fade-in">
                {children}
            </div>
        </div>
    );
};

export default MainLayout;
