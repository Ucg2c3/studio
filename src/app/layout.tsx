import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import {CloudIcon, SettingsIcon, ZapIcon, AnnoyedIcon, PanelLeft } from 'lucide-react'; // Example icon
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarInset, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { NetworkMonitoringSettings } from '@/components/sidebar/network-monitoring-settings';
import { RamUsageDisplay } from '@/components/sidebar/ram-usage-display';
import { AdCreator } from '@/components/sidebar/ad-creator';


const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'CloudGenius',
  description: 'Generate prototype apps with AI',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SidebarProvider>
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
              <SidebarTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden mr-2">
                  <PanelLeft />
                  <span className="sr-only">Toggle Sidebar</span>
                </Button>
              </SidebarTrigger>
              <div className="mr-4 flex items-center">
                <CloudIcon className="h-6 w-6 mr-2 text-primary" />
                <span className="font-bold">CloudGenius</span>
              </div>
               <div className="ml-auto flex items-center space-x-2">
                <SidebarTrigger className="hidden md:flex" />
              </div>
              {/* Future Nav items could go here */}
            </div>
          </header>
          <div className="flex flex-1">
            <Sidebar side="left" variant="sidebar" collapsible="icon">
              <SidebarHeader>
                 <h2 className="text-lg font-semibold">Settings Panel</h2>
              </SidebarHeader>
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel className="flex items-center">
                    <SettingsIcon className="mr-2" /> Network Monitoring
                  </SidebarGroupLabel>
                  <SidebarGroupContent>
                    <NetworkMonitoringSettings />
                  </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                  <SidebarGroupLabel className="flex items-center">
                    <ZapIcon className="mr-2" /> System Status
                  </SidebarGroupLabel>
                  <SidebarGroupContent>
                    <RamUsageDisplay />
                  </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                  <SidebarGroupLabel className="flex items-center">
                     <AnnoyedIcon className="mr-2" /> Ad Creator
                  </SidebarGroupLabel>
                  <SidebarGroupContent>
                    <AdCreator />
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
              <SidebarFooter>
                {/* Footer content if any */}
              </SidebarFooter>
            </Sidebar>
            <SidebarInset>
              <main className="flex-1 p-4">
                {children}
              </main>
            </SidebarInset>
          </div>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
