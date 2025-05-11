
'use client';

import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { DollarSignIcon, BarChartIcon, NetworkIcon, TrendingUpIcon } from 'lucide-react'; // Using BarChartIcon as proxy for difficulty

export function BitcoinNetworkMonitor() {
  const [btcPrice, setBtcPrice] = React.useState(0);
  const [networkHashrate, setNetworkHashrate] = React.useState(0); // EH/s
  const [difficulty, setDifficulty] = React.useState(0); // T

  React.useEffect(() => {
    // Simulate data updates
    const updateData = () => {
      setBtcPrice(Math.random() * 10000 + 55000); // Simulate $55,000 - $65,000
      setNetworkHashrate(Math.random() * 100 + 450); // Simulate 450-550 EH/s
      setDifficulty(Math.random() * 20 + 70); // Simulate 70-90 T
    };
    updateData();
    const interval = setInterval(updateData, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="shadow-none border-none">
      <CardContent className="p-2 space-y-3">
        <div className="space-y-1">
          <Label className="text-xs font-medium flex items-center">
            <DollarSignIcon className="mr-2 h-4 w-4 text-primary" />
            Current Price (USD)
          </Label>
          <p className="text-sm font-semibold">${btcPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </div>
        <div className="space-y-1">
          <Label className="text-xs font-medium flex items-center">
             <NetworkIcon className="mr-2 h-4 w-4 text-primary" />
            Network Hashrate
          </Label>
          <p className="text-sm font-semibold">{networkHashrate.toFixed(2)} EH/s</p>
        </div>
        <div className="space-y-1">
          <Label className="text-xs font-medium flex items-center">
            <TrendingUpIcon className="mr-2 h-4 w-4 text-primary" /> {/* BarChartIcon for difficulty trend */}
            Network Difficulty
          </Label>
          <p className="text-sm font-semibold">{difficulty.toFixed(2)} T</p>
        </div>
         <p className="text-xs text-muted-foreground pt-1">
          Live (simulated) Bitcoin network statistics.
        </p>
      </CardContent>
    </Card>
  );
}
