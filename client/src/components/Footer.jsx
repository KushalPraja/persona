// src/components/Footer.jsx

import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"; // Import social media icons

export function Footer() {
  return (
    <footer className="w-full py-12 bg-background text-foreground border-t border-muted"> {/* Footer with background color matching body and text color toggle, added top border */}
      <div className="max-w-8xl mx-auto px-6 lg:px-8"> {/* Centered content container */}
        <div className="flex flex-col items-center justify-center gap-6"> {/* Centered layout for all content */}
          {/* Copyright */}
          <p className="text-center">&copy; {new Date().getFullYear()} Persona. All rights reserved.</p> {/* Copyright text - always centered */}

          {/* Social Media Icons */}
          <div className="flex space-x-6"> {/* Container for social media icons with spacing */}
            <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110"><Facebook className="h-6 w-6" /></a> {/* Social icon link with scale and transition effect */}
            <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110"><Twitter className="h-6 w-6" /></a> {/* Social icon link with scale and transition effect */}
            <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110"><Instagram className="h-6 w-6" /></a> {/* Social icon link with scale and transition effect */}
            <a href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110"><Linkedin className="h-6 w-6" /></a> {/* Social icon link with scale and transition effect */}
          </div>

          {/* Optional: Add Navigation Links or other info here */}
           {/* <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
             <a href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</a>
             <a href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</a>
             <a href="#" className="text-muted-foreground hover:text-foreground">Cookies</a>
           </div> */}
        </div>
      </div>
    </footer>
  );
}
