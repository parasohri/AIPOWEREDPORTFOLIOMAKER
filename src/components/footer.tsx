import { Github,Linkedin} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-800 py-12 bg-black text-white">
      <div className="container px-4 md:px-6 mx-auto">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Branding */}
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
              PARAS OHRI
            </h3>
            <p className="text-zinc-400">Full Stack Developer</p>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-4">
            <a
              href="https://github.com/parasohri"
              aria-label="Github"
              className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors"
            >
              <Github className="h-5 w-5 text-white" />
            </a>
            <a
              href="https://www.linkedin.com/in/paras-ohri-76a44b190"
              aria-label="LinkedIn"
              className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors"
            >
              <Linkedin className="h-5 w-5 text-white" />
            </a>
            
             
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-zinc-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <p className="text-sm text-zinc-400">
            © {currentYear} PARAS OHRI. All rights reserved.
          </p>

          {/* Navigation Links */}
          <nav className="flex gap-4 mt-4 md:mt-0">
            <a
              href="#"
              aria-label="Home"
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              Home
            </a>
            <a
              href="#"
              aria-label="About"
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              About
            </a>
            <a
              href="#"
              aria-label="Projects"
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              Projects
            </a>
            <a
              href="#"
              aria-label="Contact"
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              Contact
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}