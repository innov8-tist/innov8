import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuth from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { logoutUser } from "@/apis/auth";
import { User, Settings, LogOut } from "lucide-react";

export function Navbar() {
    const { user, isLoading, isError, error, invalidate } = useAuth();
    const defaultPfpUrl = "https://t3.ftcdn.net/jpg/05/11/52/90/360_F_511529094_PISGWTmlfmBu1g4nocqdVKaHBnzMDWrN.jpg";
    const { toast } = useToast();

    if (isLoading) return <div className="p-4">Loading...</div>;
    if (isError) {
        console.error(error?.message);
        return <div className="p-4 text-red-500">Error occurred: {error?.message}</div>;
    }

    function handleLogout() {
        logoutUser()
            .then(() => {
                invalidate();
                toast({
                    title: "Logged out successfully",
                    description: "You have been logged out of your account.",
                });
            })
            .catch((error) => {
                console.error("Logout failed:", error);
                toast({
                    title: "Logout failed",
                    description: "An error occurred while logging out. Please try again.",
                    variant: "destructive",
                });
            });
    }

    return (
        <nav className="border-b border-gray-200 bg-white px-4 py-2 flex justify-between items-center">
            <Link to="/" className="text-lg font-semibold text-gray-900">
               I❤️ Finance 
            </Link>
            {user ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 rounded-full">
                            <Avatar className="h-8 w-8 border border-gray-300">
                                <AvatarImage src={user?.pfp ?? defaultPfpUrl} alt={user?.name} />
                                <AvatarFallback className="bg-gray-200 text-gray-800">
                                    {user?.name?.charAt(0) ?? "U"}
                                </AvatarFallback>
                            </Avatar>
                            <span className="sr-only">Open user menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white border border-gray-200 shadow-md rounded-md">
                        <DropdownMenuLabel className="text-gray-900">{user?.name}</DropdownMenuLabel>
                        <DropdownMenuSeparator className="border-gray-200" />
                        <DropdownMenuItem asChild>
                            <Link to="/profile" className="flex w-full items-center text-gray-700">
                                <User className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link to="/settings" className="flex w-full items-center text-gray-700">
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Settings</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="border-gray-200" />
                        <DropdownMenuItem onSelect={handleLogout} className="text-red-600">
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <Link to="/login">
                    <Button>Login</Button>
                </Link>
            )}
        </nav>
    );
}

