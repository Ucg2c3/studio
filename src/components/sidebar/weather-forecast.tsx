
'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { CloudDrizzle, CloudRain, CloudSun, Sun, Cloud, Cloudy, HelpCircle } from 'lucide-react';

// Mock data for 7-day forecast
const mockForecast = [
  { day: 'Mon', temp: '25°C', condition: 'Sunny', icon: <Sun className="h-5 w-5 text-yellow-500" /> },
  { day: 'Tue', temp: '23°C', condition: 'Partly Cloudy', icon: <CloudSun className="h-5 w-5 text-sky-500" /> },
  { day: 'Wed', temp: '22°C', condition: 'Cloudy', icon: <Cloud className="h-5 w-5 text-gray-500" /> },
  { day: 'Thu', temp: '20°C', condition: 'Showers', icon: <CloudRain className="h-5 w-5 text-blue-500" /> },
  { day: 'Fri', temp: '21°C', condition: 'Light Drizzle', icon: <CloudDrizzle className="h-5 w-5 text-cyan-500" /> },
  { day: 'Sat', temp: '24°C', condition: 'Cloudy', icon: <Cloudy className="h-5 w-5 text-slate-500" /> },
  { day: 'Sun', temp: '26°C', condition: 'Sunny', icon: <Sun className="h-5 w-5 text-yellow-500" /> },
];

export function WeatherForecast() {
  const [showRadar, setShowRadar] = React.useState(false);

  return (
    <Card className="shadow-none border-none">
      <CardContent className="p-2 space-y-3">
        <div>
          <h4 className="text-sm font-medium mb-1">7-Day Forecast</h4>
          <div className="space-y-2">
            {mockForecast.map((item) => (
              <div key={item.day} className="flex items-center justify-between text-xs p-1 rounded-md hover:bg-muted/50">
                <div className="flex items-center space-x-2">
                  {item.icon}
                  <span>{item.day}</span>
                </div>
                <span className="text-muted-foreground">{item.condition}</span>
                <span>{item.temp}</span>
              </div>
            ))}
          </div>
        </div>
        <Separator />
        <div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full text-xs"
            onClick={() => setShowRadar(!showRadar)}
          >
            {showRadar ? 'Hide Radar' : 'Show Radar'}
          </Button>
          {showRadar && (
            <div className="mt-2 p-2 border rounded-md bg-muted/20">
              <p className="text-xs text-center text-muted-foreground mb-2">Weather Radar (Placeholder)</p>
              <Image 
                src="https://picsum.photos/200/150" 
                alt="Weather Radar Placeholder" 
                width={200} 
                height={150} 
                className="rounded-md mx-auto"
                data-ai-hint="weather map" 
              />
               <p className="text-xs text-center text-muted-foreground mt-1">
                Radar functionality would be implemented here.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
