'use client';

import * as React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { LockIcon, ShieldCheckIcon, ServerIcon } from 'lucide-react';

export function NetworkMonitoringSettings() {
  const [isRealtimeEnabled, setIsRealtimeEnabled] = React.useState(true);
  const [threshold, setThreshold] = React.useState([50]);
  const [ignoredIPs, setIgnoredIPs] = React.useState('');
  const [secureProtocols, setSecureProtocols] = React.useState({
    https: true,
    ssh: false,
    vpn: true,
  });

  return (
    <div className="space-y-4 p-2">
      <div className="space-y-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Label htmlFor="realtime-monitoring" className="text-sm font-medium flex items-center">
              <LockIcon className="mr-2 h-4 w-4 text-primary" />
              Real-time Monitoring
            </Label>
          </TooltipTrigger>
          <TooltipContent side="top" align="start">
            <p>Enable to actively monitor network traffic. <br />Disabling may reduce security visibility.</p>
          </TooltipContent>
        </Tooltip>
        <div className="flex items-center space-x-2">
          <Switch
            id="realtime-monitoring"
            checked={isRealtimeEnabled}
            onCheckedChange={setIsRealtimeEnabled}
            aria-label="Toggle real-time monitoring"
          />
          <span className="text-xs text-muted-foreground">
            {isRealtimeEnabled ? 'Enabled (Secure)' : 'Disabled'}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">Toggle live updates for network traffic. Securely logs activity.</p>
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
          aria-label={`Alert threshold ${threshold[0]} percent`}
        />
        <p className="text-xs text-muted-foreground">Set usage percentage to trigger security alerts.</p>
      </div>

      <Separator />
      
      <div className="space-y-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Label htmlFor="ignored-ips" className="text-sm font-medium flex items-center">
              <ShieldCheckIcon className="mr-2 h-4 w-4 text-primary" />
               IP Exclusion List (Security)
            </Label>
          </TooltipTrigger>
          <TooltipContent side="top" align="start">
            <p>IPs listed here will be excluded from monitoring <br /> and alerting for privacy or known-safe reasons.</p>
          </TooltipContent>
        </Tooltip>
        <Input 
          id="ignored-ips" 
          placeholder="e.g., 192.168.1.1, 10.0.0.5" 
          value={ignoredIPs}
          onChange={(e) => setIgnoredIPs(e.target.value)}
          className="text-sm"
          aria-label="Ignored IP Addresses"
        />
        <p className="text-xs text-muted-foreground">Comma-separated list of IPs to exclude from monitoring.</p>
      </div>

      <Separator />

      <div className="space-y-3">
        <Label className="text-sm font-medium flex items-center">
          <ServerIcon className="mr-2 h-4 w-4 text-primary" />
          Secure Connection Protocols
        </Label>
        <div className="flex items-center justify-between">
          <Label htmlFor="https-protocol" className="text-xs">HTTPS</Label>
          <Switch 
            id="https-protocol" 
            checked={secureProtocols.https} 
            onCheckedChange={(checked) => setSecureProtocols(prev => ({...prev, https: checked as boolean}))}
            aria-label="Toggle HTTPS protocol"
          />
        </div>
         <div className="flex items-center justify-between">
          <Label htmlFor="ssh-protocol" className="text-xs">SSH</Label>
          <Switch 
            id="ssh-protocol" 
            checked={secureProtocols.ssh} 
            onCheckedChange={(checked) => setSecureProtocols(prev => ({...prev, ssh: checked as boolean}))}
            aria-label="Toggle SSH protocol"
          />
        </div>
         <div className="flex items-center justify-between">
          <Label htmlFor="vpn-protocol" className="text-xs">VPN</Label>
          <Switch 
            id="vpn-protocol" 
            checked={secureProtocols.vpn} 
            onCheckedChange={(checked) => setSecureProtocols(prev => ({...prev, vpn: checked as boolean}))}
            aria-label="Toggle VPN protocol"
          />
        </div>
        <p className="text-xs text-muted-foreground">Enable/disable specific secure protocols for connections.</p>
      </div>
      
      <Button variant="outline" size="sm" className="w-full">
        Apply Security Settings
      </Button>
    </div>
  );
}
