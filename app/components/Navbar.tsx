"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/auth-context";

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { user, isAuthenticated, logout } = useAuth();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    window.location.href = `/search?query=${searchQuery}`;
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md w-full p-4 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link href="/">MyShop</Link>
          {/* Add the search bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center space-x-2 bg-gray-700 p-2 rounded-full"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search products..."
              className="bg-transparent text-white placeholder-gray-300 focus:outline-none"
            />
            <button type="submit" className="text-white">
              🔍
            </button>
          </form>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          {/* Navigation Links */}
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/about">About Us</Link>
          {user && user.role === "admin" && <Link href="/admin">Admin</Link>}

          {/* Authenticated Items */}
          {isAuthenticated ? (
            <>
              <Link href="/account">Account</Link>
              <Link href="/orders">Orders</Link>
              <form action={logout}>
                <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Logout
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/auth/login">Login</Link>
              <Link href="/signup">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
