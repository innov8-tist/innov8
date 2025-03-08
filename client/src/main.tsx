import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import LoginPage from "./pages/login.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Dashboard from "./pages/dashboard.tsx";
import Layout from "./components/Layout.tsx";
import Assistant from "./pages/assistant.tsx";

const router = createBrowserRouter([
    {
        path: "/dashboard",
        element: (
            <Layout>
                <Dashboard />,
            </Layout>
        )
    },
    {
        path: "/dashboard/assistant",
        element: (
            <Layout>
                <> 
                <Assistant/>
                </>
            </Layout>
        )
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
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

