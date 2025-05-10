'use client';

import * as React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export function NetworkMonitoringSettings() {
  const [isRealtimeEnabled, setIsRealtimeEnabled] = React.useState(true);
  const [threshold, setThreshold] = React.useState([50]);
  const [ignoredIPs, setIgnoredIPs] = React.useState('');

  return (
    <div className="space-y-4 p-2">
      <div className="space-y-2">
        <Label htmlFor="realtime-monitoring" className="text-sm font-medium">Real-time Monitoring</Label>
        <div className="flex items-center space-x-2">
          <Switch
            id="realtime-monitoring"
            checked={isRealtimeEnabled}
            onCheckedChange={setIsRealtimeEnabled}
          />
          <span className="text-xs text-muted-foreground">
            {isRealtimeEnabled ? 'Enabled' : 'Disabled'}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">Toggle live updates for network traffic.</p>
      </div>

      <Separator />

      <div className="space-y-2">
        <Label htmlFor="alert-threshold" className="text-sm font-medium">
          Alert Threshold ({threshold[0]}%)
        </Label>
        <Slider
          id="alert-threshold"
          defaultValue={[50]}
          max={100}
          step={1}
          value={threshold}
          onValueChange={setThreshold}
          className="w-full"
        />
        <p className="text-xs text-muted-foreground">Set usage percentage to trigger alerts.</p>
      </div>

      <Separator />
      
      <div className="space-y-2">
        <Label htmlFor="ignored-ips" className="text-sm font-medium">Ignored IP Addresses</Label>
        <Input 
          id="ignored-ips" 
          placeholder="e.g., 192.168.1.1, 10.0.0.5" 
          value={ignoredIPs}
          onChange={(e) => setIgnoredIPs(e.target.value)}
          className="text-sm"
        />
        <p className="text-xs text-muted-foreground">Comma-separated list of IPs to exclude from monitoring.</p>
      </div>
      
      <Button variant="outline" size="sm" className="w-full">
        Apply Settings
      </Button>
    </div>
  );
}
