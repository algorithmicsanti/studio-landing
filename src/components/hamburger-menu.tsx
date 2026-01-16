'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const HamburgerMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hideMenu, setHideMenu] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || window.location.pathname !== '/') return;
    const hero = document.getElementById('herosection');
    if (!hero) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setHideMenu(entry.isIntersecting && entry.intersectionRatio > 0.5);
      },
      { threshold: 0.5 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  if (hideMenu && !isMenuOpen) return null;

  return (
    <>
      {/* Menu Hamburguesa */}
      <button
        onClick={() => setIsMenuOpen(true)}
        className="fixed top-4 right-4 z-50 text-white w-16 h-16 flex items-center justify-center bg-transparent transition hover:cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Menu Fullscreen */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#4BE3B2] text-white overflow-hidden">
          {/* Botón cerrar */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-0 right-0 text-white menu_close_btn
                       transition p-2 md:p-1 z-50"
          >
            <svg className="w-[12vw] h-[12vw] md:w-[7vw] md:h-[7vw]" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2.5"
              />
            </svg>
          </button>

          {/* Navigation Links */}
          <div className="h-full w-full flex flex-col justify-start pt-6 md:justify-start md:pt-6">
            <nav className="flex flex-col pl-6 space-y-1 md:space-y-2">
              {[
                { name: 'HOME', url: 'https://adnova.digital' },
                { name: 'ABOUT', url: 'https://adnova.digital/about' },
                { name: 'WORK', url: 'https://adnova.digital/work' },
                { name: 'CONTACT', url: 'https://adnova.digital/contact' }
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  onClick={() => setIsMenuOpen(false)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-full menu-font leading-none uppercase tracking-tight text-[12vw] md:text-[8vw] text-white rounded transition-all duration-300 flex items-center justify-between"
                >
                  <span className="flex items-start">
                    <span className="opacity-100 group-hover:opacity-70 transition-all duration-300">{item.name}</span>
                    {/* Star PNG - appears on hover for all items, positioned in top corner */}
                    <Image 
                      src="/star.png" 
                      alt="Star" 
                      width={20}
                      height={20}
                      className="ml-3 mt-1 opacity-0 group-hover:opacity-70 transition-all duration-300 transform group-hover:scale-110"
                      style={{ width: '0.5em', height: '0.5em' }}
                    />
                  </span>
                </a>
              ))}
            </nav>
          </div>

          {/* Footer copy y socials */}
          <div className="absolute bottom-16 left-6 space-y-4 md:bottom-16 md:left-10">
            <p className="max-w-md text-lg md:text-xl leading-snug menu-font">
              Transforming visions into experiences.
            </p>

            <a
              href="mailto:contact@adnova.digital"
              className="block hover:opacity-80 text-lg md:text-xl menu-font mb-4 md:mb-0"
            >
              contact@adnova.digital
            </a>

            {/* Social buttons - horizontal on mobile */}
            <div className="flex flex-row gap-3 md:hidden">
              {[
                { name: 'INSTAGRAM', url: 'https://www.instagram.com/adnova__digital/' },
                { name: 'LINKEDIN', url: 'https://www.linkedin.com/company/adnovamx/' },
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full border border-white text-sm menu-font hover:bg-white hover:text-black transition-colors text-center"
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>

          {/* Desktop social buttons - restore original positioning */}
          <div className="hidden md:flex absolute bottom-16 right-10 flex-row gap-4">
            {[
              { name: 'INSTAGRAM', url: 'https://www.instagram.com/adnova__digital/' },
              { name: 'LINKEDIN', url: 'https://www.linkedin.com/company/adnovamx/' },
            ].map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 rounded-full border border-white text-base menu-font hover:bg-white hover:text-black transition-colors text-center w-[210px]"
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default HamburgerMenu;
