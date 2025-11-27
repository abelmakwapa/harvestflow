import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-emerald-900 to-green-800 text-white py-12 md:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white p-2 rounded-xl">
                <Leaf className="w-6 h-6 text-emerald-600" />
              </div>
              <span className="text-xl text-white">HarvestFlow AI</span>
            </div>
            <p className="text-emerald-100 mb-6">
              Transforming agriculture through artificial intelligence and data-driven insights for sustainable farming.
            </p>
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer">
                <Facebook className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer">
                <Twitter className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer">
                <Linkedin className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer">
                <Instagram className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-emerald-100 hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="text-emerald-100 hover:text-white transition-colors">Marketplace</a></li>
              <li><a href="#" className="text-emerald-100 hover:text-white transition-colors">Logistics</a></li>
              <li><a href="#" className="text-emerald-100 hover:text-white transition-colors">Weather</a></li>
              <li><a href="#" className="text-emerald-100 hover:text-white transition-colors">AI Grading</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-emerald-100 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="text-emerald-100 hover:text-white transition-colors">API Reference</a></li>
              <li><a href="#" className="text-emerald-100 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-emerald-100 hover:text-white transition-colors">Case Studies</a></li>
              <li><a href="#" className="text-emerald-100 hover:text-white transition-colors">Support</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-emerald-100">
                <Mail className="w-4 h-4" />
                <span>info@harvestflow.ai</span>
              </li>
              <li className="flex items-center gap-2 text-emerald-100">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-2 text-emerald-100">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>123 Farm Tech Valley<br />Silicon Valley, CA 94025</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-emerald-100 text-sm">
            © {currentYear} HarvestFlow AI. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-emerald-100 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-emerald-100 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-emerald-100 hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}