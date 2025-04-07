"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/config/authcontext";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Menu, X } from "lucide-react"; // Add close icon (X) for mobile

const navLinks = [
  {
    title: "Home",
    submenu: [
      { title: "Browse", href: "/browse" },
      { title: "My Account", href: "/account" },
      { title: "Recommendations", href: "/recommendations" },
    ],
  },
  {
    title: "Build Your PC",
    submenu: [
      { title: "Build", href: "/build" },
      { title: "Checkout", href: "/checkout" },
      { title: "Upgrade", href: "/upgrade" },
      { title: "Catalog", href: "/catalog" },
    ],
  },
  {
    title: "Support",
    submenu: [{ title: "Refund", href: "/orders" }],
  },
  {
    title: "About Us",
    submenu: [{ title: "The Team", href: "/about" }],
  },
];

export default function Navbar() {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State to control the mobile menu

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prevState) => !prevState); // Toggle the menu state
  };

  return (
    <header className="w-full border-b bg-background">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="text-lg font-semibold">
          ByteMe
        </Link>

        {/* Mobile Navigation Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            className="cursor-pointer"
            onClick={toggleMobileMenu} // Toggle the menu on click
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {navLinks.map((nav) => (
            <DropdownMenu key={nav.title}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="cursor-pointer">
                  {nav.title}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {nav.submenu.map((item) => (
                  <DropdownMenuItem key={item.title}>
                    <Link href={item.href} className="w-full">
                      {item.title}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
          ))}
        </nav>
        
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 py-4 bg-background border-t border-t-muted-foreground">
          {navLinks.map((nav) => (
            <div key={nav.title} className="w-full">
              <Button
                variant="ghost"
                className="w-full text-left"
                onClick={() => setIsMobileMenuOpen(false)} // Close menu when clicked
              >
                {nav.title}
              </Button>
              <div className="space-y-2 pl-4">
                {nav.submenu.map((item) => (
                  <Link key={item.title} href={item.href} className="block">
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
