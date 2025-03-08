
import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = {
    product: [
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "#pricing" },
      { name: "Testimonials", href: "#testimonials" },
      { name: "FAQ", href: "#" },
      { name: "Roadmap", href: "#" },
    ],
    company: [
      { name: "About", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Press", href: "#" },
      { name: "Partners", href: "#" },
    ],
    resources: [
      { name: "Documentation", href: "#" },
      { name: "Guides", href: "#" },
      { name: "Help Center", href: "#" },
      { name: "API Reference", href: "#" },
      { name: "Community", href: "#" },
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
      { name: "Security", href: "#" },
    ],
  };

  return (
    <footer className="bg-finance-gray/50 pb-12 pt-20 px-6 border-t border-finance-navy/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <a href="#home" className="inline-block mb-6">
              <div className="text-2xl font-bold text-finance-navy">
                I <span className="text-finance-accent">LOVE</span> FINANCE
              </div>
            </a>
            <p className="text-finance-navy/70 mb-6 max-w-sm">
              Simplifying financial management for individuals and businesses through intelligent, intuitive technology.
            </p>
            <div className="flex space-x-4">
              {["Twitter", "LinkedIn", "Facebook", "Instagram"].map((social) => (
                <a 
                  key={social} 
                  href="#" 
                  className="h-10 w-10 rounded-full bg-finance-navy/5 flex items-center justify-center text-finance-navy/70 hover:bg-finance-accent/10 hover:text-finance-accent transition-all duration-300"
                >
                  <span className="sr-only">{social}</span>
                  <div className="w-5 h-5"></div>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-6 text-finance-navy">Product</h3>
            <ul className="space-y-4">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-finance-navy/70 hover:text-finance-accent transition-all duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-6 text-finance-navy">Company</h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-finance-navy/70 hover:text-finance-accent transition-all duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-6 text-finance-navy">Resources</h3>
            <ul className="space-y-4">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-finance-navy/70 hover:text-finance-accent transition-all duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-finance-navy/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-finance-navy/60 text-sm mb-4 md:mb-0">
            &copy; {currentYear} I LOVE FINANCE. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            {footerLinks.legal.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-finance-navy/60 text-sm hover:text-finance-accent transition-all duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
