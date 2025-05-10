
'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ExternalLink } from 'lucide-react';

// Mock data for news feed
const mockNews = [
  { id: 1, title: 'Tech Giant Unveils New AI Model', source: 'TechCrunch', time: '2h ago', url: '#' },
  { id: 2, title: 'Global Markets React to Economic Data', source: 'Reuters', time: '3h ago', url: '#' },
  { id: 3, title: 'Breakthrough in Renewable Energy Storage', source: 'ScienceDaily', time: '5h ago', url: '#' },
  { id: 4, title: 'Cloud Computing Trends for 2024', source: 'InfoWorld', time: '1d ago', url: '#' },
  { id: 5, title: 'Cybersecurity Threats on the Rise', source: 'Wired', time: '1d ago', url: '#' },
];

export function NewsFeed() {
  return (
    <Card className="shadow-none border-none">
      <CardContent className="p-2">
        <h4 className="text-sm font-medium mb-2">Top Headlines</h4>
        <ScrollArea className="h-[180px] w-full">
          <div className="space-y-3 pr-2">
            {mockNews.map((item) => (
              <a 
                key={item.id} 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-2 rounded-md hover:bg-muted/50 transition-colors"
              >
                <p className="text-xs font-semibold truncate">{item.title}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground mt-0.5">
                  <span>{item.source} - {item.time}</span>
                  <ExternalLink className="h-3 w-3" />
                </div>
              </a>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
