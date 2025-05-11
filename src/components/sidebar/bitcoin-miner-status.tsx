
'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { CpuIcon, ZapIcon, TrendingUpIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function BitcoinMinerStatus() {
  const { toast } = useToast();
  const [isMining, setIsMining] = React.useState(false);
  const [hashRate, setHashRate] = React.useState(0); // TH/s
  const [estimatedEarnings, setEstimatedEarnings] = React.useState(0); // BTC per day

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isMining) {
      setHashRate(Math.random() * 100 + 50); // Simulate 50-150 TH/s
      setEstimatedEarnings(Math.random() * 0.001);
      interval = setInterval(() => {
        setHashRate(Math.random() * 100 + 50);
        setEstimatedEarnings(Math.random() * 0.001);
      }, 5000);
    } else {
      setHashRate(0);
      setEstimatedEarnings(0);
    }
    return () => clearInterval(interval);
  }, [isMining]);

  const handleToggleMining = () => {
    setIsMining(!isMining);
    toast({
      title: `Mining ${!isMining ? 'Started' : 'Stopped'}`,
      description: `Bitcoin mining has been ${!isMining ? 'activated' : 'deactivated'}.`,
    });
  };

  return (
    <Card className="shadow-none border-none">
      <CardContent className="p-2 space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="mining-toggle" className="text-sm font-medium flex items-center">
            <ZapIcon className="mr-2 h-4 w-4 text-primary" />
            Mining Status
          </Label>
          <Switch
            id="mining-toggle"
            checked={isMining}
            onCheckedChange={handleToggleMining}
            aria-label="Toggle Bitcoin mining"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Current Hashrate</Label>
          <div className="flex items-center space-x-2">
            <CpuIcon className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm font-semibold">{hashRate.toFixed(2)} TH/s</p>
          </div>
          <Progress value={(hashRate / 200) * 100} className="h-2" /> {/* Max 200 TH/s for progress */}
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Est. Daily Earnings</Label>
          <div className="flex items-center space-x-2">
            <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm font-semibold">{estimatedEarnings.toFixed(6)} BTC</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="w-full" onClick={() => toast({ title: "Pool Settings", description: "Configure mining pool settings (placeholder)." })}>
          Configure Pool
        </Button>
         <p className="text-xs text-muted-foreground pt-1">
          Real-time Bitcoin mining simulation. Earnings are illustrative.
        </p>
      </CardContent>
    </Card>
  );
}
