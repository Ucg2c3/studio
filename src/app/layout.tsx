
import * as React from 'react';
import type {Metadata} from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import {CloudIcon, SettingsIcon, ZapIcon, AnnoyedIcon, PanelLeft, CloudSunIcon, NewspaperIcon, LockIcon, ImageIcon, CpuIcon, GaugeIcon, WalletIcon, Settings2Icon, LogInIcon, PaletteIcon, SearchCodeIcon, UserCircle2, LayoutDashboardIcon, CreditCardIcon, BanknoteIcon, LandmarkIcon, UserPlusIcon, HomeIcon, TriangleIcon } from 'lucide-react';
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarInset, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarGroupContent } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { NetworkMonitoringSettings } from '@/components/sidebar/network-monitoring-settings';
import { RamUsageDisplay } from '@/components/sidebar/ram-usage-display';
import { AdCreator } from '@/components/sidebar/ad-creator';
import { WeatherForecast } from '@/components/sidebar/weather-forecast';
import { NewsFeed } from '@/components/sidebar/news-feed';
import { ImageCreator } from '@/components/sidebar/image-creator';
import { BitcoinMinerStatus } from '@/components/sidebar/bitcoin-miner-status';
import { BitcoinNetworkMonitor } from '@/components/sidebar/bitcoin-network-monitor';
import { BitcoinWallet } from '@/components/sidebar/bitcoin-wallet';
import { AuthSection } from '@/components/sidebar/auth-section';
import { BuilderSection } from '@/components/sidebar/builder-section';
import { HomeSection } from '@/components/sidebar/home-section';
import { AnalysisSection } from '@/components/sidebar/analysis-section';
import { BillingSection } from '@/components/sidebar/billing-section';
import { WalletSection } from '@/components/sidebar/wallet-section';
import { DashboardSection } from '@/components/sidebar/dashboard-section';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { FirebaseProvider } from '@/lib/firebase-client';


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
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <FirebaseProvider>
          <TooltipProvider>
            <SidebarProvider>
              <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" style={{ '--header-height': '3.5rem' } as React.CSSProperties}>
                <div className="container flex h-14 items-center">
                  <SidebarTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden mr-2">
                      <PanelLeft />
                      <span className="sr-only">Toggle Sidebar</span>
                    </Button>
                  </SidebarTrigger>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="mr-4 flex items-center cursor-default">
                        <CloudIcon className="h-6 w-6 mr-2 text-primary" />
                        <span className="font-bold">CloudGenius</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Your AI-powered Application Prototyper</p>
                    </TooltipContent>
                  </Tooltip>
                   <div className="ml-auto flex items-center space-x-2">
                    {/* Placeholder for future user profile/settings dropdown */}
                    <SidebarTrigger className="hidden md:flex" />
                  </div>
                </div>
              </header>
              <div className="flex flex-1">
                <Sidebar side="left" variant="sidebar" collapsible="icon">
                  <SidebarHeader>
                    <div className="text-lg font-semibold text-foreground text-center md:text-left p-2">Features</div>
                  </SidebarHeader>
                  <SidebarContent className="space-y-1"> {/* Reduced gap for denser sidebar */}
                    <SidebarGroup>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SidebarGroupLabel className="flex items-center">
                            <UserCircle2 className="mr-2 h-4 w-4" /> Authentication
                          </SidebarGroupLabel>
                        </TooltipTrigger>
                        <TooltipContent side="right" align="center">
                          <p>Sign in or register to access your dashboard and features.</p>
                        </TooltipContent>
                      </Tooltip>
                      <SidebarGroupContent>
                        <AuthSection />
                      </SidebarGroupContent>
                    </SidebarGroup>

                    <SidebarGroup>
                      <Tooltip>
                        <TooltipTrigger asChild>
                           <SidebarGroupLabel className="flex items-center">
                            <HomeIcon className="mr-2 h-4 w-4" /> Home
                          </SidebarGroupLabel>
                        </TooltipTrigger>
                        <TooltipContent side="right" align="center">
                          <p>Return to the main application page.</p>
                        </TooltipContent>
                      </Tooltip>
                       <SidebarGroupContent>
                          <HomeSection />
                      </SidebarGroupContent>
                    </SidebarGroup>

                    <SidebarGroup>
                      <Tooltip>
                        <TooltipTrigger asChild>
                           <SidebarGroupLabel className="flex items-center">
                            <LayoutDashboardIcon className="mr-2 h-4 w-4" /> Dashboard
                          </SidebarGroupLabel>
                        </TooltipTrigger>
                        <TooltipContent side="right" align="center">
                          <p>View your activity summary and simulated earnings.</p>
                        </TooltipContent>
                      </Tooltip>
                       <SidebarGroupContent>
                          <DashboardSection />
                      </SidebarGroupContent>
                    </SidebarGroup>

                    <SidebarGroup>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SidebarGroupLabel className="flex items-center">
                            <TriangleIcon className="mr-2 h-4 w-4" /> App Prototyper
                          </SidebarGroupLabel>
                        </TooltipTrigger>
                        <TooltipContent side="right" align="center">
                          <p>Generate Next.js application prototypes with AI.</p>
                        </TooltipContent>
                      </Tooltip>
                       <SidebarGroupContent>
                          <p className="text-xs text-muted-foreground p-2">Main application generation tool (homepage).</p>
                      </SidebarGroupContent>
                    </SidebarGroup>

                    <SidebarGroup>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SidebarGroupLabel className="flex items-center">
                            <PaletteIcon className="mr-2 h-4 w-4" /> Website Builder
                          </SidebarGroupLabel>
                        </TooltipTrigger>
                        <TooltipContent side="right" align="center">
                          <p>Describe and generate website prototypes.</p>
                        </TooltipContent>
                      </Tooltip>
                      <SidebarGroupContent>
                        <BuilderSection />
                      </SidebarGroupContent>
                    </SidebarGroup>

                    <SidebarGroup>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SidebarGroupLabel className="flex items-center">
                            <SearchCodeIcon className="mr-2 h-4 w-4" /> Dev Analysis
                          </SidebarGroupLabel>
                        </TooltipTrigger>
                        <TooltipContent side="right" align="center">
                          <p>Review app performance & quality insights (Lighthouse-like).</p>
                        </TooltipContent>
                      </Tooltip>
                      <SidebarGroupContent>
                        <AnalysisSection />
                      </SidebarGroupContent>
                    </SidebarGroup>

                    <SidebarGroup>
                      <Tooltip>
                          <TooltipTrigger asChild>
                              <SidebarGroupLabel className="flex items-center">
                                  <CreditCardIcon className="mr-2 h-4 w-4" /> Billing
                              </SidebarGroupLabel>
                          </TooltipTrigger>
                          <TooltipContent side="right" align="center">
                              <p>Manage your subscription and payment methods.</p>
                          </TooltipContent>
                      </Tooltip>
                      <SidebarGroupContent>
                          <BillingSection />
                      </SidebarGroupContent>
                     </SidebarGroup>

                     <SidebarGroup>
                          <Tooltip>
                              <TooltipTrigger asChild>
                                  <SidebarGroupLabel className="flex items-center">
                                      <WalletIcon className="mr-2 h-4 w-4" /> Wallet &amp; Finance
                                  </SidebarGroupLabel>
                              </TooltipTrigger>
                              <TooltipContent side="right" align="center">
                                  <p>Manage bank accounts, virtual cards, and send currency.</p>
                              </TooltipContent>
                          </Tooltip>
                          <SidebarGroupContent>
                              <WalletSection />
                          </SidebarGroupContent>
                      </SidebarGroup>


                    <SidebarGroup>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SidebarGroupLabel className="flex items-center">
                            <SettingsIcon className="mr-2 h-4 w-4" /> Network Monitoring
                          </SidebarGroupLabel>
                        </TooltipTrigger>
                        <TooltipContent side="right" align="center">
                          <p>Configure network monitoring settings, alerts, and ignored IPs for enhanced security and performance.</p>
                        </TooltipContent>
                      </Tooltip>
                      <SidebarGroupContent>
                        <NetworkMonitoringSettings />
                      </SidebarGroupContent>
                    </SidebarGroup>
                    <SidebarGroup>
                       <Tooltip>
                          <TooltipTrigger asChild>
                              <SidebarGroupLabel className="flex items-center">
                              <ZapIcon className="mr-2 h-4 w-4" /> System Status
                              </SidebarGroupLabel>
                          </TooltipTrigger>
                          <TooltipContent side="right" align="center">
                              <p>View current system resource utilization, including RAM usage.</p>
                          </TooltipContent>
                      </Tooltip>
                      <SidebarGroupContent>
                        <RamUsageDisplay />
                      </SidebarGroupContent>
                    </SidebarGroup>
                    <SidebarGroup>
                      <Tooltip>
                          <TooltipTrigger asChild>
                              <SidebarGroupLabel className="flex items-center">
                              <AnnoyedIcon className="mr-2 h-4 w-4" /> Ad Creator
                              </SidebarGroupLabel>
                          </TooltipTrigger>
                          <TooltipContent side="right" align="center">
                              <p>Design and submit advertisements for review and publishing.</p>
                          </TooltipContent>
                      </Tooltip>
                      <SidebarGroupContent>
                        <AdCreator />
                      </SidebarGroupContent>
                    </SidebarGroup>
                    <SidebarGroup>
                       <Tooltip>
                          <TooltipTrigger asChild>
                              <SidebarGroupLabel className="flex items-center">
                                  <ImageIcon className="mr-2 h-4 w-4" /> AI Image Creator
                              </SidebarGroupLabel>
                          </TooltipTrigger>
                          <TooltipContent side="right" align="center">
                              <p>Generate unique images from text prompts using AI.</p>
                          </TooltipContent>
                      </Tooltip>
                      <SidebarGroupContent>
                          <ImageCreator />
                      </SidebarGroupContent>
                    </SidebarGroup>
                     <SidebarGroup>
                      <Tooltip>
                          <TooltipTrigger asChild>
                              <SidebarGroupLabel className="flex items-center">
                              <CpuIcon className="mr-2 h-4 w-4" /> Bitcoin Miner
                              </SidebarGroupLabel>
                          </TooltipTrigger>
                          <TooltipContent side="right" align="center">
                              <p>Monitor and control your (mock) Bitcoin mining operations.</p>
                          </TooltipContent>
                      </Tooltip>
                      <SidebarGroupContent>
                        <BitcoinMinerStatus />
                      </SidebarGroupContent>
                    </SidebarGroup>
                    <SidebarGroup>
                      <Tooltip>
                          <TooltipTrigger asChild>
                              <SidebarGroupLabel className="flex items-center">
                              <GaugeIcon className="mr-2 h-4 w-4" /> Bitcoin Stats
                              </SidebarGroupLabel>
                          </TooltipTrigger>
                          <TooltipContent side="right" align="center">
                              <p>View real-time (mock) Bitcoin network statistics.</p>
                          </TooltipContent>
                      </Tooltip>
                      <SidebarGroupContent>
                        <BitcoinNetworkMonitor />
                      </SidebarGroupContent>
                    </SidebarGroup>
                    <SidebarGroup>
                      <Tooltip>
                          <TooltipTrigger asChild>
                              <SidebarGroupLabel className="flex items-center">
                              <WalletIcon className="mr-2 h-4 w-4" /> Bitcoin Wallet
                              </SidebarGroupLabel>
                          </TooltipTrigger>
                          <TooltipContent side="right" align="center">
                              <p>Manage your (mock) Bitcoin wallet, view balance and transactions.</p>
                          </TooltipContent>
                      </Tooltip>
                      <SidebarGroupContent>
                        <BitcoinWallet />
                      </SidebarGroupContent>
                    </SidebarGroup>
                     <SidebarGroup>
                      <Tooltip>
                          <TooltipTrigger asChild>
                              <SidebarGroupLabel className="flex items-center">
                              <CloudSunIcon className="mr-2 h-4 w-4" /> Weather
                              </SidebarGroupLabel>
                          </TooltipTrigger>
                          <TooltipContent side="right" align="center">
                              <p>Check the 7-day weather forecast and view radar information.</p>
                          </TooltipContent>
                      </Tooltip>
                      <SidebarGroupContent>
                        <WeatherForecast />
                      </SidebarGroupContent>
                    </SidebarGroup>
                    <SidebarGroup>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SidebarGroupLabel className="flex items-center">
                            <NewspaperIcon className="mr-2 h-4 w-4" /> News
                          </SidebarGroupLabel>
                        </TooltipTrigger>
                        <TooltipContent side="right" align="center">
                          <p>Catch up on the latest top headlines and stay informed.</p>
                        </TooltipContent>
                      </Tooltip>
                      <SidebarGroupContent>
                        <NewsFeed />
                      </SidebarGroupContent>
                    </SidebarGroup>
                  </SidebarContent>
                  <SidebarFooter>
                    {/* Footer content could include a logout button or app version */}
                  </SidebarFooter>
                </Sidebar>
                <SidebarInset>
                  <main className="flex-1 p-4 md:p-6 lg:p-8 bg-muted/20 min-h-[calc(100vh-var(--header-height,4rem)-1px)]">
                    {children}
                  </main>
                </SidebarInset>
              </div>
            </SidebarProvider>
          </TooltipProvider>
        </FirebaseProvider>
        <Toaster />
      </body>
    </html>
  );
}
