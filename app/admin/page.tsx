import { redirect } from "next/navigation";
import { getAuthStatus } from "../auth/auth";
import Leftsidebar from "../components/Leftsidebar";
import Rightsidebar from "../components/Rightsidebar";

const AdminDashboard = async () => {
  const { isAuthenticated } = await getAuthStatus();

  if (!isAuthenticated) {
    redirect("/auth/login");
  }
  return (
    <div className="flex flex-row gap-2 p-2 h-[90vh] overflow-auto">
      {/* Left Panel */}
      <div className="w-1/4 h-full">
        <Leftsidebar />
      </div>
      {/* Right Panel */}
      <div className="flex-1 h-full">
        <Rightsidebar />
      </div>
    </div>
  );
};

export default AdminDashboard;
