"use client";
import { useEffect, useState } from "react";

const Rightsidebar = () => {
  const [slug, setSlug] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean | false>(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const slagParam = urlParams.get("slug");
    setSlug(slagParam);
    setLoading(false);
  }, []);

  if (loading) {
    <div className="h-full flex items-center justify-center">loading...</div>;
  }

  if (!slug && !loading)
    return (
      <div className="h-full flex flex-col items-center justify-center text-7xl text-gray-700 -rotate-[30deg] opacity-70">
        <div className="blur-sm">Admin Dashboard</div>
      </div>
    );

  return <div className="h-full">{slug}</div>;
};

export default Rightsidebar;
