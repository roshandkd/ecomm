"use client";
// pages/cart.tsx

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("/api/verify"); // A protected API route to check JWT token
        setLoading(false);
      } catch (error) {
        console.log(error);
        router.push("/auth/login"); // Redirect to login if not authenticated
      }
    };

    checkAuth();
  }, [router]);

  if (loading) return <div>Loading...</div>;

  return <div>Your Cart</div>;
};

export default CartPage;
