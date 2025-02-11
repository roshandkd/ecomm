"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/auth-context";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { user, isAuthenticated, logout } = useAuth();
  const pathname = usePathname();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    window.location.href = `/search?query=${searchQuery}`;
  };

  const navItems = [
    {
      id: 1,
      href: "/",
      name: "Home",
      allowed: true,
    },
    {
      id: 2,
      href: "/shop",
      name: "Shop",
      allowed: true,
    },
    {
      id: 3,
      href: "/about",
      name: "About Us",
      allowed: true,
    },
    {
      id: 4,
      href: "/admin",
      name: "Admin",
      allowed: user && user.role === "admin",
    },
    {
      id: 5,
      href: "/account",
      name: "Account",
      allowed: isAuthenticated,
    },
    {
      id: 6,
      href: "/orders",
      name: "Orders",
      allowed: isAuthenticated,
    },
    {
      id: 7,
      href: "/auth/login",
      name: "Login",
      allowed: !isAuthenticated,
    },
    {
      id: 8,
      href: "/auth/signup",
      name: "Sign Up",
      allowed: !isAuthenticated,
    },
  ];

  const updatedNavItems = navItems.filter((item) => item.allowed);

  return (
    <nav className="bg-gray-800 text-white shadow-md w-full p-4 py-2 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6 flex-1">
          <Link href="/">MyShop</Link>
          {/* Add the search bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex w-96 items-center space-x-2 bg-gray-700 p-2 px-4 rounded-full"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search products..."
              className="bg-transparent text-white placeholder-gray-300 focus:outline-none w-full"
            />
            <button type="submit" className="text-white">
              🔍
            </button>
          </form>
        </div>

        <div className="flex items-center space-x-6">
          {/* Navigation Links */}
          {updatedNavItems.map(({ id, href, name }) => {
            return (
              <Link
                key={id}
                href={href}
                className={clsx(
                  pathname === href
                    ? "border-b border-red-400"
                    : "border-b border-transparent hover:border-blue-600"
                )}
              >
                {name}
              </Link>
            );
          })}
          {isAuthenticated && (
            <form action={logout}>
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
