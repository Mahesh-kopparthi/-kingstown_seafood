import React from 'react'
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-ocean">Kings Town</h3>
            <p className="text-gray-400 text-sm">
              Fresh From Ocean To Your Plate. Delivering premium seafood with quality and trust.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-ocean">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#home" className="hover:text-ocean transition">Home</a></li>
              <li><a href="#products" className="hover:text-ocean transition">Products</a></li>
              <li><a href="#about" className="hover:text-ocean transition">About Us</a></li>
              <li><a href="#contact" className="hover:text-ocean transition">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4 text-ocean">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-aqua" />
                <a href="tel:+918586164999" className="hover:text-ocean transition">+91 98586 64999</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-aqua" />
                <a href="mailto:orders@kingstownseafood.com" className="hover:text-ocean transition">orders@kingstownseafood.com</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-aqua mt-1" />
                <span>Bhimavaram, Andhra Pradesh, India</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold mb-4 text-ocean">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="bg-ocean hover:bg-aqua p-2 rounded-full transition" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-ocean hover:bg-aqua p-2 rounded-full transition" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="bg-ocean hover:bg-aqua p-2 rounded-full transition" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 Kings Town Sea Food. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
