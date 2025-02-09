"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logout = async () => {
  const cookieStore = await cookies(); // Await the Promise to get the cookie store

  // To delete a cookie, set it with an expired date
  cookieStore.set("token", "", { expires: new Date(0) });

  // Redirect to the dashboard
  redirect("/dashboard");
};
