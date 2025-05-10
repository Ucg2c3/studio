'use client';

import * as React from 'react';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function RamUsageDisplay() {
  const [ramUsage, setRamUsage] = React.useState(0);
  const [totalRam, setTotalRam] = React.useState(16); // Example: 16GB
  const [usedRam, setUsedRam] = React.useState(0);

  React.useEffect(() => {
    // Simulate RAM usage updates
    const interval = setInterval(() => {
      const newUsedRam = Math.random() * totalRam;
      setUsedRam(newUsedRam);
      setRamUsage((newUsedRam / totalRam) * 100);
    }, 2000);
    return () => clearInterval(interval);
  }, [totalRam]);

  return (
    <Card className="shadow-none border-none">
      <CardContent className="p-2 space-y-2">
        <div>
          <Label htmlFor="ram-progress" className="text-sm font-medium">RAM Usage</Label>
          <Progress id="ram-progress" value={ramUsage} className="w-full h-3 mt-1" />
          <p className="text-xs text-muted-foreground mt-1 text-right">
            {usedRam.toFixed(1)} GB / {totalRam} GB ({ramUsage.toFixed(0)}%)
          </p>
        </div>
        <p className="text-xs text-muted-foreground">
          Current system memory utilization.
        </p>
      </CardContent>
    </Card>
  );
}
