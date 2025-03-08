import { Heart } from "lucide-react";
import Navbar from "@/components/Landing_nav";
import InfiniteMovingCards from "../components/InfiniteMovingCards";
import ParticlesBackground from "@/components/ParticlesBackground";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      <ParticlesBackground />
      <Navbar />
      
      {/* Home Section */}
      <section id="home" className="min-h-[80vh] flex flex-col items-center justify-center pt-16 space-y-6">
        <div className="text-center max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center space-x-2 animate-fade-in hover:scale-105 transition-transform duration-300">
            <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#221F26] to-[#403E43]">
              I LOVE FINANCE
            </h1>
            <Heart className="w-8 h-8 text-red-500 animate-pulse" />
          </div>
          <p className="mt-6 text-lg text-[#8A898C] max-w-3xl mx-auto animate-fade-in">
            AI-powered financial tracking, smart tax returns, and investment insights to help you manage your money effortlessly and make data-driven decisions for a secure future
          </p>
        </div>
      </section>

      {/* Who We Are Section */}
      <section id="who-we-are" className="min-h-[80vh] flex items-center justify-center bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#0EA5E9] via-[#8B5CF6] to-[#D946EF] rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-500 animate-pulse"></div>
            <div className="relative bg-white rounded-lg p-8 shadow-xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
              <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#221F26] to-[#403E43]">Who We Are</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                We are a dedicated team of financial experts and tech enthusiasts committed to simplifying financial management through AI-powered solutions. Our platform helps individuals and businesses track expenses, optimize tax returns, and make data-driven investment decisions. With automation and intelligent insights, we ensure smarter financial planning for a secure future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16">
        <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#221F26] to-[#403E43]">Our Products</h2>
        <InfiniteMovingCards />
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#221F26] to-[#403E43]">Contact Us</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-white rounded-lg shadow-sm transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-gray-600">contact@ilovefinance.com</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <h3 className="font-semibold mb-2">Phone</h3>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <h3 className="font-semibold mb-2">Address</h3>
              <p className="text-gray-600">123 Finance Street, Tech City, TC 12345</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
