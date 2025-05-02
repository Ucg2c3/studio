import { PrototypeGenerator } from '@/components/prototype-generator';

export default function Home() {
  return (
    <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-2 text-center">Welcome to CloudGenius</h1>
        <p className="text-muted-foreground text-center mb-8">
            Describe your application idea, and let AI generate a prototype for you.
        </p>
        <PrototypeGenerator />
    </div>
  );
}
