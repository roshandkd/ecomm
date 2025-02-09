import Link from "next/link";
import { getAuthStatus } from "../auth/auth";
import { redirect } from "next/navigation";
import { logout } from "../auth/actions";

export default async function Cart() {
  const authStatus = await getAuthStatus();

  console.log(authStatus);
  if (!authStatus) {
    redirect("/auth/login");
    // return <div>Unauthorized</div>;
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Cart</h1>
      <p className="mb-6">Welcome to your cart!</p>
      <Link href="/" className="text-blue-500 hover:underline">
        Go to Dashboard
      </Link>
      {authStatus && (
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
  );
}

// //old
// "use client";
// // pages/cart.tsx
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// const CartPage = () => {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         await axios.get("/api/verify"); // A protected API route to check JWT token
//         setLoading(false);
//       } catch (error) {
//         console.log(error);
//         router.push("/auth/login"); // Redirect to login if not authenticated
//       }
//     };
//     checkAuth();
//   }, [router]);
//   if (loading) return <div>Loading...</div>;
//   return <div>Your Cart</div>;
// };
// export default CartPage;
