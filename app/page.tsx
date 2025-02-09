import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="mb-6">Welcome to the public dashboard!</p>
      <Link href="/cart" className="text-blue-500 hover:underline">
        Go to Cart
      </Link>
    </div>
  );
}
