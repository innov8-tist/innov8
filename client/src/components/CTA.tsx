import React, { useEffect, useRef } from "react";
import Button from "./Button";

const CTA: React.FC = () => {
  const ctaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ctaRef.current) return;
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = ctaRef.current.getBoundingClientRect();
      
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      
      const elements = ctaRef.current.querySelectorAll('.parallax');
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
      id="contact" 
      ref={ctaRef}
      className="py-24 px-6 relative overflow-hidden bg-finance-light-bg"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-finance-blue/10 rounded-full blur-3xl parallax" data-speed="0.5"></div>
        <div className="absolute -bottom-40 -left-20 w-[400px] h-[400px] bg-finance-accent/10 rounded-full blur-3xl parallax" data-speed="0.7"></div>
      </div>
      
      <div className="max-w-7xl mx-auto z-10 relative">
        <div className="glass rounded-3xl p-12 md:p-16 max-w-5xl mx-auto text-center border border-white/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-finance-accent/5 to-finance-blue/10"></div>
          
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-finance-accent/10 rounded-full blur-3xl parallax" data-speed="0.8"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-finance-blue/10 rounded-full blur-3xl parallax" data-speed="1.2"></div>
          
          <div className="relative z-10">
            <div className="inline-block mb-3 px-3 py-1 rounded-full bg-finance-blue/10 text-finance-accent animate-fade-in">
              <span  className="text-sm font-medium">Get Started Today</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-finance-navy animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Ready to Transform Your <span className="text-finance-accent">Financial Life</span>?
            </h2>
            
            <p className="text-lg text-finance-navy/70 mb-10 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Join thousands of users who are already experiencing the benefits of our intelligent financial platform. Sign up for free and start your journey today.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Button 
                variant="primary" 
                size="lg"
                className="bg-finance-special-blue text-white hover:bg-finance-special-blue/90"
              >
                Start Free Trial
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-finance-navy border-finance-navy hover:bg-finance-navy/10"
              >
                Schedule a Demo
              </Button>
            </div>
            
            <div className="mt-10 flex flex-col md:flex-row gap-6 justify-center items-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-finance-navy/10"></div>
                ))}
              </div>
              
              <div className="flex items-center text-finance-navy/70">
                <svg className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm">Rated 4.9/5 from over 1,000 users</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
