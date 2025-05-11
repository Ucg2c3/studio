
'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { CpuIcon, ZapIcon, TrendingUpIcon, Settings2Icon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

type MinerPreset = "maximize" | "balanced" | "powerSaver";

interface PresetConfig {
  minHash: number;
  maxHash: number;
  minEarnings: number;
  maxEarnings: number;
  description: string;
}

const presetConfigurations: Record<MinerPreset, PresetConfig> = {
  maximize: { minHash: 100, maxHash: 200, minEarnings: 0.0008, maxEarnings: 0.0015, description: "Optimized for maximum hashrate and potential earnings. Uses more power." },
  balanced: { minHash: 50, maxHash: 150, minEarnings: 0.0005, maxEarnings: 0.001, description: "A balance between performance and power consumption." },
  powerSaver: { minHash: 20, maxHash: 80, minEarnings: 0.0002, maxEarnings: 0.0006, description: "Minimizes power usage, resulting in lower hashrate and earnings." },
};

export function BitcoinMinerStatus() {
  const { toast } = useToast();
  const [isMining, setIsMining] = React.useState(false);
  const [hashRate, setHashRate] = React.useState(0); // TH/s
  const [estimatedEarnings, setEstimatedEarnings] = React.useState(0); // BTC per day
  const [selectedPreset, setSelectedPreset] = React.useState<MinerPreset>("balanced");

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isMining) {
      const config = presetConfigurations[selectedPreset];
      const simulate = () => {
        setHashRate(Math.random() * (config.maxHash - config.minHash) + config.minHash);
        setEstimatedEarnings(Math.random() * (config.maxEarnings - config.minEarnings) + config.minEarnings);
      };
      simulate(); // Initial simulation
      interval = setInterval(simulate, 5000);
    } else {
      setHashRate(0);
      setEstimatedEarnings(0);
    }
    return () => clearInterval(interval);
  }, [isMining, selectedPreset]);

  const handleToggleMining = () => {
    setIsMining(!isMining);
    toast({
      title: `Mining ${!isMining ? 'Started' : 'Stopped'}`,
      description: `Bitcoin mining has been ${!isMining ? 'activated' : 'deactivated'} with ${selectedPreset} preset.`,
    });
  };

  const handlePresetChange = (value: string) => {
    const newPreset = value as MinerPreset;
    setSelectedPreset(newPreset);
    toast({
      title: "Preset Changed",
      description: `Miner preset set to "${newPreset}". ${presetConfigurations[newPreset].description}`,
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

        <Separator />

        <div className="space-y-1">
            <Label htmlFor="miner-preset" className="text-sm font-medium flex items-center">
                <Settings2Icon className="mr-2 h-4 w-4 text-primary" />
                Performance Preset
            </Label>
            <Select value={selectedPreset} onValueChange={handlePresetChange}>
                <SelectTrigger id="miner-preset" className="w-full text-sm">
                    <SelectValue placeholder="Select performance preset" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="maximize">Maximize Performance</SelectItem>
                    <SelectItem value="balanced">Balanced</SelectItem>
                    <SelectItem value="powerSaver">Power Saver</SelectItem>
                </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground pt-0.5">
                {presetConfigurations[selectedPreset].description}
            </p>
        </div>

        <Separator />

        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Current Hashrate</Label>
          <div className="flex items-center space-x-2">
            <CpuIcon className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm font-semibold">{hashRate.toFixed(2)} TH/s</p>
          </div>
          <Progress value={(hashRate / presetConfigurations.maximize.maxHash) * 100} className="h-2" /> {/* Max based on highest possible */}
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
