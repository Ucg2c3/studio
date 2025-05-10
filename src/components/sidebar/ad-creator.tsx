'use client';

import * as React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';


export function AdCreator() {
  const { toast } = useToast();
  const [adTitle, setAdTitle] = React.useState('');
  const [adContent, setAdContent] = React.useState('');
  const [adType, setAdType] = React.useState('');
  const [isTargeted, setIsTargeted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for ad creation logic
    console.log({ adTitle, adContent, adType, isTargeted });
    toast({
      title: "Ad Submitted!",
      description: `Your ad "${adTitle}" has been submitted for review.`,
    });
    // Reset form
    setAdTitle('');
    setAdContent('');
    setAdType('');
    setIsTargeted(false);
  };

  return (
    <Card className="shadow-none border-none">
      <CardContent className="p-2">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="ad-title" className="text-sm font-medium">Ad Title</Label>
            <Input 
              id="ad-title" 
              placeholder="e.g., Summer Sale!" 
              value={adTitle}
              onChange={(e) => setAdTitle(e.target.value)}
              required
              className="text-sm"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="ad-content" className="text-sm font-medium">Ad Content</Label>
            <Textarea 
              id="ad-content" 
              placeholder="Describe your ad..." 
              value={adContent}
              onChange={(e) => setAdContent(e.target.value)}
              required
              className="text-sm min-h-[80px]"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="ad-type" className="text-sm font-medium">Ad Type</Label>
            <Select value={adType} onValueChange={setAdType}>
              <SelectTrigger id="ad-type" className="w-full text-sm">
                <SelectValue placeholder="Select ad type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="banner">Banner Ad</SelectItem>
                <SelectItem value="video">Video Ad</SelectItem>
                <SelectItem value="text">Text Ad</SelectItem>
                <SelectItem value="social">Social Media Ad</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="targeted-ad" 
              checked={isTargeted}
              onCheckedChange={(checked) => setIsTargeted(checked as boolean)}
            />
            <Label htmlFor="targeted-ad" className="text-sm font-medium">
              Targeted Ad
            </Label>
          </div>
          <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="sm">
            Create Ad
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
