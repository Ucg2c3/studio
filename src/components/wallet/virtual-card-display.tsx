
'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { EyeIcon, EyeOffIcon, CopyIcon, RefreshCwIcon, ShieldCheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VirtualCardDisplayProps {
  onNewCard: () => void;
}

export function VirtualCardDisplay({ onNewCard }: VirtualCardDisplayProps) {
  const { toast } = useToast();
  const [cardDetails, setCardDetails] = React.useState({
    number: '•••• •••• •••• 1234',
    name: 'Cloud User',
    expiry: '12/28',
    cvv: '•••',
  });
  const [showDetails, setShowDetails] = React.useState(false);
  const [isGenerating, setIsGenerating] = React.useState(false);

  const toggleShowDetails = () => {
    setShowDetails(!showDetails);
    if (!showDetails) {
      // Simulate fetching real details
      setCardDetails(prev => ({
        ...prev,
        number: '5555 4444 3333 1234',
        cvv: '789',
      }));
    } else {
      setCardDetails(prev => ({
        ...prev,
        number: '•••• •••• •••• 1234',
        cvv: '•••',
      }));
    }
  };

  const handleCopy = (textToCopy: string, fieldName: string) => {
    if (!showDetails && (fieldName === 'Card Number' || fieldName === 'CVV')) {
        toast({ title: 'Reveal details first', description: `Please reveal card details to copy the ${fieldName.toLowerCase()}.`, variant: 'destructive'});
        return;
    }
    navigator.clipboard.writeText(textToCopy);
    toast({ description: `${fieldName} copied to clipboard.` });
  };

  const handleGenerateNewCard = async () => {
    setIsGenerating(true);
    setShowDetails(false);
    setCardDetails({
      number: '•••• •••• •••• ••••',
      name: 'Cloud User',
      expiry: '--/--',
      cvv: '•••',
    });
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
    
    const newLastFour = Math.floor(1000 + Math.random() * 9000);
    const newExpiryMonth = String(Math.floor(1 + Math.random() * 12)).padStart(2, '0');
    const newExpiryYear = String(new Date().getFullYear() + Math.floor(Math.random() * 3 + 2)).slice(-2);

    setCardDetails({
      number: `•••• •••• •••• ${newLastFour}`,
      name: 'Cloud User',
      expiry: `${newExpiryMonth}/${newExpiryYear}`,
      cvv: '•••',
    });
    setIsGenerating(false);
    onNewCard();
    toast({ title: 'New Virtual Card Generated', description: 'Your new virtual card is ready. Remember to reveal details to use it.' });
  };

  return (
    <div className="space-y-6">
      <Card className={cn(
        "w-full max-w-md mx-auto rounded-xl shadow-2xl text-primary-foreground p-6 relative overflow-hidden",
        "bg-gradient-to-br from-primary via-primary/80 to-accent"
      )}>
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/10 rounded-full opacity-50"></div>
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-white/5 rounded-full opacity-30"></div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">CloudGenius Virtual Card</h3>
            <ShieldCheckIcon className="h-6 w-6 text-accent-foreground/80" />
          </div>
          <div className="mb-6">
            <p className="text-xs tracking-wider">CARD NUMBER</p>
            <div className="flex items-center">
              <p className="text-2xl font-mono tracking-widest">{cardDetails.number}</p>
              {showDetails && cardDetails.number !== '•••• •••• •••• ••••' && (
                <Button variant="ghost" size="icon" className="ml-2 h-7 w-7 text-primary-foreground hover:bg-white/20" onClick={() => handleCopy(cardDetails.number.replace(/\s/g, ''), 'Card Number')}>
                  <CopyIcon className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs tracking-wider">CARD HOLDER</p>
              <p className="font-medium">{cardDetails.name}</p>
            </div>
            <div>
              <p className="text-xs tracking-wider text-right">EXPIRES</p>
              <p className="font-medium text-right">{cardDetails.expiry}</p>
            </div>
            <div className="ml-4">
              <p className="text-xs tracking-wider text-right">CVV</p>
              <div className="flex items-center justify-end">
                <p className="font-medium text-right">{cardDetails.cvv}</p>
                 {showDetails && cardDetails.cvv !== '•••' && (
                    <Button variant="ghost" size="icon" className="ml-1 h-6 w-6 text-primary-foreground hover:bg-white/20" onClick={() => handleCopy(cardDetails.cvv, 'CVV')}>
                    <CopyIcon className="h-3 w-3" />
                    </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
      <div className="flex flex-col sm:flex-row gap-2 justify-center">
        <Button onClick={toggleShowDetails} variant="outline" className="flex-1">
          {showDetails ? <EyeOffIcon className="mr-2 h-4 w-4" /> : <EyeIcon className="mr-2 h-4 w-4" />}
          {showDetails ? 'Hide Details' : 'Show Details'}
        </Button>
        <Button onClick={handleGenerateNewCard} variant="secondary" disabled={isGenerating} className="flex-1">
          <RefreshCwIcon className={cn("mr-2 h-4 w-4", isGenerating && "animate-spin")} />
          {isGenerating ? 'Generating...' : 'Generate New Card'}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground text-center">
        This is a mock virtual card for demonstration purposes. Card details are not real.
      </p>
    </div>
  );
}
