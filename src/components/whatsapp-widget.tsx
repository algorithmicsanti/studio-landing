'use client';

import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppWidget = () => {
  const [isHovered, setIsHovered] = useState(false);
  const phoneNumber = '5215564768657'; // +52 1 55 6476 8657 without formatting
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center transition-all duration-300"
      aria-label="Contact us on WhatsApp"
    >
      {/* Tooltip */}
      <div
        className={`absolute right-16 bg-[#25D366] text-white px-4 py-2 rounded-lg font-georgia text-sm whitespace-nowrap transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        Chat with us
      </div>

      {/* WhatsApp Button */}
      <div
        className={`w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          isHovered ? 'scale-110' : 'scale-100'
        } hover:shadow-xl`}
      >
        <FaWhatsapp className="w-7 h-7 text-white" />
      </div>
    </a>
  );
};

export default WhatsAppWidget;
