"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { gsap } from "gsap";

type NavMenuProps = {
  user: {
    name: string | null | undefined;
    email: string | null | undefined;
    image?: string | null | undefined;
  } | null;
};

export default function NavMenu({ user }: NavMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    if (!menuRef.current || !menuItemsRef.current) return;

    const tl = gsap.timeline({ paused: true });

    tl.fromTo(
      menuRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.inOut" }
    ).fromTo(
      menuItemsRef.current.children,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, ease: "power2.out" },
      "-=0.2"
    );

    if (isOpen) {
      tl.play();
    } else {
      tl.reverse();
    }

    return () => {
      tl.kill();
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        onClick={toggleMenu}
        className="text-white hover:text-gray-300 focus:outline-none z-50 relative"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className="fixed inset-0 bg-black z-40 flex items-center justify-center mt-80"
        >
          <div
            ref={menuItemsRef}
            className="text-center bg-black w-full h-full flex flex-col items-center justify-center"
          >
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-3xl font-bold text-white hover:text-gray-300 my-6 transition-colors"
                onClick={toggleMenu}
              >
                {item.name}
              </Link>
            ))}
            {user ? (
              <div className="mt-8 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                  <Image
                    src={user.image ?? "/default-avatar.png"}
                    alt="User Avatar"
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </div>
                <Link
                  href="/profile"
                  className="text-2xl font-bold text-white hover:text-gray-300 transition-colors"
                  onClick={toggleMenu}
                >
                  Profile
                </Link>
              </div>
            ) : (
              <Link
                href="/auth"
                className="inline-block mt-8 bg-white font-semibold text-black px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                onClick={toggleMenu}
              >
                Join now
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
