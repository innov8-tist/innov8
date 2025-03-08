
import React, { useEffect, useRef } from "react";
import Button from "./Button";

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      
      const elements = heroRef.current.querySelectorAll('.parallax');
      elements.forEach((el) => {
        const speed = parseFloat((el as HTMLElement).dataset.speed || "1");
        const xOffset = x * speed * 20;
        const yOffset = y * speed * 20;
        (el as HTMLElement).style.transform = `translate(${xOffset}px, ${yOffset}px)`;
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="relative min-h-screen flex items-center py-20 px-6 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-finance-blue/10 rounded-full blur-3xl parallax" data-speed="0.5"></div>
        <div className="absolute bottom-10 -left-20 w-80 h-80 bg-finance-blue/15 rounded-full blur-3xl parallax" data-speed="0.8"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-finance-accent/5 rounded-full blur-2xl parallax" data-speed="0.3"></div>
      </div>
      
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 z-10">
        <div className="flex flex-col justify-center">
          <div className="inline-block mb-3 px-3 py-1 rounded-full bg-finance-blue/10 text-finance-accent animate-fade-in">
            <span className="text-sm font-medium">Simplify Your Finances</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-finance-navy animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Manage Your Money <br />
            <span className="text-finance-accent">Smarter</span> Not Harder
          </h1>
          
          <p className="text-lg text-finance-navy/70 mb-8 max-w-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Revolutionary financial tools that help you track expenses, manage investments, and plan for the future—all in one elegant platform.
          </p>
          
          <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button variant="primary" size="lg">
              Get Started for Free
            </Button>
            <Button variant="outline" size="lg">
              Watch Demo
            </Button>
          </div>
        </div>
        
        <div className="flex items-center justify-center">
          <div className="relative w-full">
            <img 
              src="dashbord.png" 
              alt="Finance Dashboard" 
              className="w-full h-auto rounded-lg shadow-xl animate-fade-in" 
              style={{ animationDelay: '0.2s' }}
            />
            
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-finance-accent/10 rounded-full blur-md parallax" data-speed="1.5"></div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-finance-blue/20 rounded-full blur-md parallax" data-speed="1.2"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
