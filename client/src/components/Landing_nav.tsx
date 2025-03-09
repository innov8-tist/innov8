import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { name: "Home", href: "#home" },
        { name: "Features", href: "#features" },
        { name: "Contact", href: "#contact" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [scrolled]);

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 py-4 px-6 transition-all duration-300",
                scrolled
                    ? "bg-white/80 backdrop-blur-md shadow-sm"
                    : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center">
                    <a href="#home" className="text-2xl font-bold text-finance-navy transition-all duration-300 hover:text-finance-accent">
                        I <span className="text-finance-accent">❤️ </span> FINANCE 
                    </a>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-finance-navy/80 hover:text-finance-accent transition-all duration-300 font-medium"
                        >
                            {link.name}
                        </a>
                    ))}
                    <Link to={"/dashboard"}>
                        <Button
                            variant="primary"
                            className="ml-4 bg-finance-special-blue text-white hover:bg-finance-special-blue/90"
                        >
                            Get Started
                        </Button>
                    </Link>
                </div>

                {/* Mobile menu button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden text-finance-navy p-2"
                    aria-expanded={mobileMenuOpen}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        {mobileMenuOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 p-4 bg-white/95 backdrop-blur-md shadow-md animate-fade-in">
                    <div className="flex flex-col space-y-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-finance-navy/80 hover:text-finance-accent px-4 py-2 transition-all duration-300"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.name}
                            </a>
                        ))}
                        <Button
                            variant="primary"
                            className="mt-2 w-full bg-finance-special-blue text-white hover:bg-finance-special-blue/90"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Get Started
                        </Button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
