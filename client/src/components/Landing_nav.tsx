import { Link } from "react-router-dom";
import { LogIn } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-[#F6F6F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-12">
            <Link to="/" className="text-xl font-semibold text-[#221F26]">I LOVE FINANCE</Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="#home" className="text-[#8A898C] hover:text-[#221F26] transition-colors">Home</Link>
              <Link to="#who-we-are" className="text-[#8A898C] hover:text-[#221F26] transition-colors">Who We Are</Link>
              <Link to="#products" className="text-[#8A898C] hover:text-[#221F26] transition-colors">Products</Link>
              <Link to="#contact" className="text-[#8A898C] hover:text-[#221F26] transition-colors">Contact</Link>
            </div>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 rounded-full bg-[#221F26] text-white hover:bg-[#403E43] transition-colors">
            <LogIn className="w-4 h-4" />
            <Link to="/dashbord">Sign In</Link>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
