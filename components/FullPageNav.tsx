"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import {
  MenuIcon,
  XIcon,
  Home,
  User,
  Briefcase,
  Image,
  Mail,
} from "lucide-react";
import Link from "next/link";

export default function EnhancedFullPageNav() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const menuItemsRef = useRef<HTMLAnchorElement[]>([]);
  const bgRef = useRef(null);

  useEffect(() => {
    gsap.set(menuRef.current, { yPercent: -100 });
    gsap.set(menuItemsRef.current, { y: 50, opacity: 0 });
    gsap.set(bgRef.current, { scaleY: 0, transformOrigin: "top" });
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Open menu
      gsap.to(bgRef.current, {
        scaleY: 1,
        duration: 0.6,
        ease: "power3.inOut",
      });
      gsap.to(menuRef.current, {
        yPercent: 0,
        duration: 0.6,
        ease: "power3.inOut",
      });
      gsap.to(menuItemsRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.3,
        ease: "power3.out",
      });
    } else {
      // Close menu
      gsap.to(menuItemsRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "power3.in",
      });
      gsap.to(menuRef.current, {
        yPercent: -100,
        duration: 0.6,
        delay: 0.25,
        ease: "power3.inOut",
      });
      gsap.to(bgRef.current, {
        scaleY: 0,
        duration: 0.6,
        delay: 0.6,
        ease: "power3.inOut",
      });
    }
  };

  const menuItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "About", href: "#", icon: User },
    { name: "Services", href: "#", icon: Briefcase },
    { name: "Portfolio", href: "#", icon: Image },
    { name: "Contact", href: "#", icon: Mail },
  ];

  return (
    <div>
      <button
        onClick={toggleMenu}
        className="fixed right-14 top-5 lg:top-5 lg:right-60 z-50 p-3 bg-primary text-primary-foreground rounded-full shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
      </button>

      <div
        ref={bgRef}
        className="fixed inset-0 bg-gradient-to-br from-primary to-black z-30"
      ></div>

      <nav
        ref={menuRef}
        className="fixed inset-0 flex items-center justify-center z-40"
        aria-hidden={!isOpen}
      >
        <ul className="text-center">
          {menuItems.map((item, index) => (
            <li key={item.name} className="mb-8">
              <Link
                href={item.href}
                className="group flex items-center text-3xl font-bold text-primary-foreground hover:text-accent transition-colors"
                ref={(el) => {
                  if (el) menuItemsRef.current[index] = el;
                }}
                onClick={toggleMenu}
              >
                <item.icon
                  className="mr-4 transition-transform group-hover:scale-125"
                  size={32}
                />
                <span className="relative overflow-hidden">
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent transform origin-left scale-x-0 transition-transform group-hover:scale-x-100"></span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
