import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

import { CssBaseline } from "@mui/material";

import type { Metadata } from "next";

import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";
import DashboardLayout from "@/components/common/DashboardLayout";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { UserProvider } from "../context/userContext";

export const metadata: Metadata = {
  title: "Vehicle Transfer Moudule",
  description: "Vehicle Transfer Moudule",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("user_id", user.id)
    .single();

  if (profileError) {
    return <div>Error loading profile</div>;
  }

  const role = profile?.role;

  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <UserProvider user={user} role={role}>
              <DashboardLayout>{children}</DashboardLayout>
            </UserProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
