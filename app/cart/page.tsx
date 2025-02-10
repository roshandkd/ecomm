import Link from "next/link";
import { getAuthStatus } from "../auth/auth";
import { redirect } from "next/navigation";

export default async function Cart() {
  const { isAuthenticated } = await getAuthStatus();

  if (!isAuthenticated) {
    redirect("/auth/login");
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Cart</h1>
      <p className="mb-6">Welcome to your cart!</p>
      <Link href="/" className="text-blue-500 hover:underline">
        Go to Dashboard
      </Link>
    </div>
  );
}
