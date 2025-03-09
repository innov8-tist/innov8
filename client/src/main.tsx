import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Landingpage from "./pages/Landingpage.tsx";
import LoginPage from "./pages/login.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Dashboard from "./pages/dashboard.tsx";
import Dashboard2 from "./components/Dashboard.tsx";
import Layout from "./components/Layout.tsx";
import Assistant from "./pages/assistant.tsx";
import PersonalAssistant from "./pages/PersonalAssistant.tsx";
import StockAnalyzer from "./pages/stock-analysis.tsx";
import NotFound from "./pages/NotFound.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Landingpage />,
    },
    {
        path: "/dashboard",
        element:
            <Layout>
                < Dashboard2 />,
            </Layout>
    },
    {
        path: "/dashboard/advisor",
        element: (
            <Layout>
                <>
                    <Assistant />
                </>
            </Layout>
        )
    },
    {
        path: "/dashboard/personal-assistant",
        element: (
            <Layout>
                <>
                    <PersonalAssistant />
                </>
            </Layout>
        )
    },
    {
        path: "/dashboard/stock-analyzer",
        element: (
            <Layout>
                <>
                    <StockAnalyzer />
                </>
            </Layout>
        )
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "*",
        element: <NotFound />
    }
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <Toaster />
        </QueryClientProvider>
    </React.StrictMode >
);

