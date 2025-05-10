import { PrototypeGenerator } from '@/components/prototype-generator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function Home() {
  return (
    <div className="container mx-auto py-8 px-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <h1 className="text-3xl font-bold mb-2 text-center cursor-default">Welcome to CloudGenius</h1>
          </TooltipTrigger>
          <TooltipContent>
            <p>Let's build something amazing together!</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
        <p className="text-muted-foreground text-center mb-8">
            Describe your application idea, and let AI generate a prototype for you.
        </p>
        <PrototypeGenerator />
    </div>
  );
}
