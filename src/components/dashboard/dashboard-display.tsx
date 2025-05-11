
'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bitcoin, BarChart3, Zap, Palette, Search, DollarSign, Briefcase, Activity, TrendingUp, Eye } from 'lucide-react';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, LabelList } from "recharts"

const mockUser = {
  name: 'Demo User',
  email: 'demo@cloudgenius.com',
  avatarUrl: 'https://picsum.photos/100/100', // Placeholder
  accountType: 'Pro Plan (Mock)',
};

const mockActivity = {
  prototypesGenerated: 0,
  websitesBuilt: 0,
  analysesRun: 0,
};

const mockEarnings = {
  simulatedBtcMined: 0, // Updated in useEffect
  virtualCardRewards: 0, // Updated in useEffect
  totalValue: 0, // Updated in useEffect
};

const chartData = [
  { month: "January", earnings: 186, prototypes: 5 },
  { month: "February", earnings: 305, prototypes: 8 },
  { month: "March", earnings: 237, prototypes: 6 },
  { month: "April", earnings: 273, prototypes: 7 },
  { month: "May", earnings: 209, prototypes: 4 },
  { month: "June", earnings: 0, prototypes: 0 }, // Current month, to be updated
];

const chartConfig = {
  earnings: {
    label: "Simulated Earnings ($)",
    color: "hsl(var(--primary))",
  },
  prototypes: {
    label: "Prototypes",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig;

export function DashboardDisplay() {
  const [activityData, setActivityData] = React.useState(mockActivity);
  const [earningsData, setEarningsData] = React.useState(mockEarnings);
  const [currentMonthChartData, setCurrentMonthChartData] = React.useState([...chartData]);

  React.useEffect(() => {
    // Simulate dynamic data loading
    const timer = setTimeout(() => {
      setActivityData({
        prototypesGenerated: Math.floor(Math.random() * 20) + 5,
        websitesBuilt: Math.floor(Math.random() * 10) + 2,
        analysesRun: Math.floor(Math.random() * 50) + 10,
      });
      
      const btcMined = parseFloat((Math.random() * 0.05).toFixed(4));
      const cardRewards = parseFloat((Math.random() * 50 + 10).toFixed(2));
      setEarningsData({
        simulatedBtcMined: btcMined,
        virtualCardRewards: cardRewards,
        totalValue: parseFloat(((btcMined * 60000) + cardRewards).toFixed(2)), // Assuming 1 BTC = $60,000
      });

      const juneDataIndex = currentMonthChartData.findIndex(d => d.month === "June");
      if (juneDataIndex !== -1) {
        const updatedChartData = [...currentMonthChartData];
        updatedChartData[juneDataIndex] = {
            month: "June",
            earnings: Math.floor(cardRewards + (Math.random() * 150)), // Example combination
            prototypes: Math.floor((activityData.prototypesGenerated || 5) / 2), // Example
        };
        setCurrentMonthChartData(updatedChartData);
      }

    }, 500); // Simulate a short delay for data fetching

    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array, runs once on mount. If activityData was a dep, it would loop.

  return (
    <div className="space-y-8">
      <Card className="shadow-lg rounded-lg">
        <CardHeader className="flex flex-row items-center space-x-4 pb-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={mockUser.avatarUrl} alt={mockUser.name} data-ai-hint="profile avatar" />
            <AvatarFallback>{mockUser.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{mockUser.name}</CardTitle>
            <CardDescription>{mockUser.email} - {mockUser.accountType}</CardDescription>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-md rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prototypes Generated</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activityData.prototypesGenerated}</div>
            <p className="text-xs text-muted-foreground">Apps brought to life</p>
          </CardContent>
        </Card>
        <Card className="shadow-md rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Websites Built</CardTitle>
            <Palette className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activityData.websitesBuilt}</div>
            <p className="text-xs text-muted-foreground">Using the AI Website Builder</p>
          </CardContent>
        </Card>
        <Card className="shadow-md rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dev Analyses Run</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activityData.analysesRun}</div>
            <p className="text-xs text-muted-foreground">Lighthouse-like reports generated</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-xl flex items-center"><TrendingUp className="mr-2 h-5 w-5 text-primary"/>Simulated Earnings & Value</CardTitle>
          <CardDescription>Overview of your mock financial activity within CloudGenius.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2 p-4 border rounded-md bg-secondary/30">
                <h3 className="text-sm font-medium flex items-center"><Bitcoin className="mr-2 h-4 w-4 text-yellow-500"/>Simulated BTC Mined</h3>
                <p className="text-2xl font-bold">{earningsData.simulatedBtcMined.toFixed(4)} BTC</p>
                <p className="text-xs text-muted-foreground">Approx. ${ (earningsData.simulatedBtcMined * 60000).toFixed(2) }</p>
            </div>
            <div className="space-y-2 p-4 border rounded-md bg-secondary/30">
                <h3 className="text-sm font-medium flex items-center"><DollarSign className="mr-2 h-4 w-4 text-green-500"/>Virtual Card Rewards</h3>
                <p className="text-2xl font-bold">${earningsData.virtualCardRewards.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">Mock rewards from card usage</p>
            </div>
             <div className="space-y-2 p-4 border rounded-md bg-primary/10 md:col-span-2">
                <h3 className="text-lg font-semibold flex items-center text-primary"><Eye className="mr-2 h-5 w-5"/>Total Estimated Value</h3>
                <p className="text-3xl font-bold text-primary">${earningsData.totalValue.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Combined simulated value from your activities.</p>
            </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-xl flex items-center"><BarChart3 className="mr-2 h-5 w-5 text-primary"/>Activity & Earnings Trend (Mock)</CardTitle>
          <CardDescription>
            Monthly simulated earnings and prototype generation activity.
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[350px] w-full">
          <ChartContainer config={chartConfig} className="w-full h-full">
            <BarChart accessibilityLayer data={currentMonthChartData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--muted-foreground))" />
              <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" />
              <ChartTooltip content={<ChartTooltipContent hideIndicator />} />
              <Bar dataKey="earnings" fill="var(--color-earnings)" radius={4} yAxisId="left">
                 <LabelList dataKey="earnings" position="top" offset={8} className="fill-foreground text-xs" formatter={(value: number) => `$${value}`} />
              </Bar>
              <Bar dataKey="prototypes" fill="var(--color-prototypes)" radius={4} yAxisId="right">
                <LabelList dataKey="prototypes" position="top" offset={8} className="fill-foreground text-xs" />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground text-center">
        All data on this dashboard is for demonstration and mock purposes only.
      </p>
    </div>
  );
}
