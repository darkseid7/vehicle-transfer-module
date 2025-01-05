import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

import { CssBaseline } from "@mui/material";

import type { Metadata } from "next";

import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";
import DashboardLayout from "@/components/common/DashboardLayout";

export const metadata: Metadata = {
  title: "Vehicle Transfer Moudule",
  description: "Vehicle Transfer Moudule",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <DashboardLayout>{children}</DashboardLayout>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
