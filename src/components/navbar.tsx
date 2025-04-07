"use client";

import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "@/app/config/authcontext";
import Link from "next/link";
import { Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

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
  const { user, loading } = useAuth();

  useEffect(() => {
    console.log("Firebase User:", user);
  }, [user]);
  return (
    <header className="w-full border-b bg-background">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="text-lg font-semibold">
          ByteMe
        </Link>

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
        <div></div>
      </div>
    </header>
  );
}
